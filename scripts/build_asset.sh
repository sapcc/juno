#!/bin/bash

# exit on error
set -e

if [ ! -f "CODEOWNERS" ]; then
  echo "This script must run from root of juno repo"
  exit
fi

function help() {
  echo "Usage: build_assets.sh --asset-path||-ap --asset-name||-sn --root-path||-rp --output-path||-op
    Example: ./scripts/build_asset.sh --asset-name auth --asset-path ./apps/auth/ --root-path /app --output-path /tmp/juno-build
    --root-path is optional default is $(pwd)
    --output-path is optional default is ./build-result"
  exit
}

if [[ "$1" == "--help" ]]; then
  help
fi

ROOT_PATH=$(pwd)
OUTPUT_PATH="./build-result"
while [[ $# -gt 0 ]]; do
  case $1 in
  --asset-name | -an)
    ASSET_NAME="$2"
    shift # past argument
    shift # past value
    ;;
  --asset-path | -ap)
    ASSET_PATH="$2"
    shift # past argument
    shift # past value
    ;;
  --root-path | -rp)
    ROOT_PATH="$2"
    shift # past argument
    shift # past value
    ;;
  --output-path | -op)
    OUTPUT_PATH="$2"
    shift # past argument
    shift # past value
    ;;
  --help)
    help
    ;;
  *)
    echo "$1 unkown option!"
    exit 1
    ;;
  esac
done

if [[ -z "$ASSET_NAME" ]]; then
  echo "No ASSET_NAME path found 😐"
  exit
fi

if [[ -z "$ASSET_PATH" ]]; then
  echo "No ASSET_PATH path found 😐"
  exit
fi

echo "use ROOT_PATH   = $ROOT_PATH"
echo "use ASSET_NAME  = $ASSET_NAME"
echo "use ASSET_PATH  = $ASSET_PATH"
echo "use OUTPUT_PATH = $OUTPUT_PATH"
echo "=================================="

echo "generate COMMUNICATOR.md in $ROOT_PATH/$ASSET_PATH"
node scripts/generate_communication_readme.mjs --path=$ROOT_PATH/$ASSET_PATH

# install and build libs
npm run build-libs

# TEST AND BUILD ASSET
# IGNORE_EXTERNALS=true will results in a bundle which includes all dependencies.
# This is the case if the jspm cdn is unreachable!!!
echo "=================================="
echo "run Tests for ...."
ASSET_NAME=$(jq -r .name $ROOT_PATH/$ASSET_PATH/package.json)
npm --workspace $ASSET_NAME run test --if-present
NODE_ENV=production IGNORE_EXTERNALS=false npm --workspace $ASSET_NAME run build --if-present

# get BUILD_DIR from package.json
# strip `leading` slash from BUILD_DIR and split by / and use first part
# Example: package.json#module = build/esm/index.js
# echo build/esm/index.js | sed -e 's/^\///' | cut -d/ -f1
# Result: build
echo "=================================="
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

echo "=================================="
echo "use BUILD_DIR = $BUILD_DIR"
echo "copy assets data from $ROOT_PATH/$ASSET_PATH/$BUILD_DIR to $OUTPUT_PATH/$ASSET_PATH/"
mkdir -p "$OUTPUT_PATH/$ASSET_PATH"
cp -r "$ROOT_PATH/$ASSET_PATH/$BUILD_DIR" "$OUTPUT_PATH/$ASSET_PATH/"
cp "$ROOT_PATH/$ASSET_PATH/package.json" "$OUTPUT_PATH/$ASSET_PATH/package.json"
if [ -f "$ROOT_PATH/$ASSET_PATH/COMMUNICATOR.md" ]; then
  cp -n "$ROOT_PATH/$ASSET_PATH/COMMUNICATOR.md" "$OUTPUT_PATH/$ASSET_PATH/COMMUNICATOR.md"
fi
cp "$ROOT_PATH/$ASSET_PATH/README.md" "$OUTPUT_PATH/$ASSET_PATH/README.md"

echo "create $OUTPUT_PATH/$ASSET_PATH/package.tgz"
cd "$OUTPUT_PATH/$ASSET_PATH"
# todo use npm-pack instead https://docs.npmjs.com/cli/v6/commands/npm-pack
tar --exclude="package.tgz" -czf package.tgz .

echo "=================================="
echo "Build for $ASSET_NAME done 🙂"
echo "=================================="
echo "Results"
ls -la
echo "=================================="
