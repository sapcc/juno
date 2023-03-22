#!/bin/sh

# exit on error
set -e

if [ ! -f "CODEOWNERS" ]; then
  echo "This script must run from root of juno"
  exit
fi

if [[ "$1" == "--help" ]]; then
  echo "Usage: build_assets.sh ASSET_NAME ASSET_PATH ROOT_PATH*"
  echo "       ROOT_PATH is optional default is /juno"
  exit
fi

ASSET_NAME=$1
if [[ -z "$ASSET_NAME" ]]; then
  echo "No ASSET_NAME path found 😐"
  exit
fi

ASSET_PATH=$2
if [[ -z "$ASSET_PATH" ]]; then
  echo "No ASSET_PATH path found 😐"
  exit
fi

ROOT_PATH=${3-"/juno"}

echo "use ROOT_PATH  = $ROOT_PATH"
echo "use ASSET_NAME = $ASSET_NAME"
echo "use ASSET_PATH = $ASSET_PATH"
echo "============================"
# this dir is mounted from the pipeline inside the images
# upgrade to latest asset XY source to prevent edge cases
# for instance the base image build is to slow and we are using in that point of time a
# base image where the changes form asset XY is not backed in

echo "sync /tmp/latest/$ASSET_PATH to $ROOT_PATH/$ASSET_PATH"
echo "============================"
#rsync -avu --delete "/tmp/latest/$ASSET_PATH/" "$ROOT_PATH/$ASSET_PATH" >/dev/null

# install and build libs
# IMPORTANT!
# some assets have dependencies to libs
# to test the asset we need to build the libs which includes all dependencies
# build-libs script set the NODE_ENV to development which includes all
# dependencies in the builds defined in peer dependencies.
# RUN yarn install >/dev/null ; yarn build-libs > /dev/null
yarn workspace $ASSET_NAME install >/dev/null
#yarn build-libs

echo "generate COMMUNICATOR.md in $ROOT_PATH/$ASSET_PATH"
node scripts/generate_communication_readme.mjs --path=$ROOT_PATH/$ASSET_PATH

# TEST AND BUILD ASSET
# IGNORE_EXTERNALS=true will results in a bundle which includes all dependencies.
# This is the case if the jspm cdn is unreachable!!!
echo "============================"
echo "run Tests...."
ASSET_NAME=$(jq -r .name $ROOT_PATH/$ASSET_PATH/package.json)
ASSET_TEST_SCRIPT=$(jq -r '.scripts | has("test")' $ROOT_PATH/$ASSET_PATH/package.json)
ASSET_BUILD_SCRIPT=$(jq -r '.scripts | has("build")' $ROOT_PATH/$ASSET_PATH/package.json)
echo $ASSET_NAME "test script: $ASSET_TEST_SCRIPT, build script: $ASSET_BUILD_SCRIPT"
([[ "$ASSET_TEST_SCRIPT" == "false" ]] || CI=true yarn workspace $ASSET_NAME test) &&
  ([[ "$ASSET_BUILD_SCRIPT" == "false" ]] || CI=false NODE_ENV=production IGNORE_EXTERNALS=false yarn workspace $ASSET_NAME build 1>/dev/null)

# get BUILD_DIR from package.json
# strip `leading` slash from BUILD_DIR and split by / and use first part
# Example: package.json#module = build/esm/index.js
# echo build/esm/index.js | sed -e 's/^\///' | cut -d/ -f1
# Result: build
if [[ -z "$BUILD_DIR" ]]; then
  echo "Look for module in package.json"
  BUILD_DIR=$(jq -r .module $ROOT_PATH/$ASSET_PATH/package.json)
fi

if [[ "$BUILD_DIR" == "null" ]]; then
  echo "No module found, look for main in package.json"
  BUILD_DIR=$(jq -r .main $ROOT_PATH/$ASSET_PATH/package.json)
fi

if [[ "$BUILD_DIR" == "null" ]]; then
  echo "No main or module in package.json found, use default build for BUILD_DIR"
  BUILD_DIR="build"
else
  # $BUILD_DIR = build/index.js -> BUILD_DIR = build
  echo "Module or main found, extract BUILD_DIR"
  BUILD_DIR="$(echo $BUILD_DIR | sed -e 's/^\///' | cut -d/ -f1)"
fi

if [[ -z "$BUILD_DIR" ]]; then
  echo "No BUILD_DIR found 😐"
  exit
fi

echo "============================"
echo "use BUILD_DIR = $BUILD_DIR"
echo "copy assets data from $ROOT_PATH/$ASSET_PATH/$BUILD_DIR to /tmp/$ASSET_PATH/"
mkdir -p "/tmp/$ASSET_PATH"
cp -r "$ROOT_PATH/$ASSET_PATH/$BUILD_DIR" "/tmp/$ASSET_PATH/"
cp "$ROOT_PATH/$ASSET_PATH/package.json" "/tmp/$ASSET_PATH/package.json"
if [ -f "$ROOT_PATH/$ASSET_PATH/COMMUNICATOR.md" ]; then
  cp -n "$ROOT_PATH/$ASSET_PATH/COMMUNICATOR.md" "/tmp/$ASSET_PATH/COMMUNICATOR.md"
fi
cp "$ROOT_PATH/$ASSET_PATH/README.md" "/tmp/$ASSET_PATH/README.md"

echo "create /tmp/$ASSET_PATH/package.tgz"
cd "/tmp/$ASSET_PATH" && tar --exclude="package.tgz" -czf package.tgz .
