#!/bin/bash

# exit on error
set -e

if [ ! -f "CODEOWNERS" ]; then
  echo "This script must run from root of juno repo"
  exit 1
fi

function help() {
  echo "Usage: build_assets.sh --asset-path||-ap --asset-name||-sn --output-path||-op
    Example: ./ci/scripts/build_asset.sh --asset-name auth --asset-path ./apps/auth/ --output-path /tmp/juno-build
    --output-path is optional default is ./build-result"
  exit
}

if [[ "$1" == "--help" ]]; then
  help
fi

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
  echo "Error: no ASSET_NAME path found 😐"
  exit 1
fi

if [[ -z "$ASSET_PATH" ]]; then
  echo "Error: no ASSET_PATH path found 😐"
  exit 1
fi

echo "=================================="
echo "### build asset $ASSET_NAME ###"
echo "----------------------------------"
echo "use ASSET_NAME  = $ASSET_NAME"
echo "use ASSET_PATH  = $ASSET_PATH"
echo "use OUTPUT_PATH = $OUTPUT_PATH"
echo "----------------------------------"

echo "generate COMMUNICATOR.md in $ASSET_PATH"
node ci/scripts/generate_communication_readme.mjs --path=$ASSET_PATH

# install and build libs
npm run build-libs

# TEST AND BUILD ASSET
# IGNORE_EXTERNALS=true will results in a bundle which includes all dependencies.
# This is the case if the jspm cdn is unreachable!!!
echo "----------------------------------"
echo "run Tests for ...."
ASSET_NAME=$(jq -r .name $ASSET_PATH/package.json)
npm --workspace $ASSET_NAME run test --if-present
NODE_ENV=production IGNORE_EXTERNALS=false npm --workspace $ASSET_NAME run build --if-present

# get BUILD_DIR from package.json
# strip `leading` slash from BUILD_DIR and split by / and use first part
# Example: package.json#module = build/esm/index.js
# echo build/esm/index.js | sed -e 's/^\///' | cut -d/ -f1
# Result: build
echo "----------------------------------"
if [[ -z "$BUILD_DIR" ]]; then
  echo "Look for module in package.json"
  BUILD_DIR=$(jq -r .module $ASSET_PATH/package.json)
fi

if [[ "$BUILD_DIR" == "null" ]]; then
  echo "No module found, look for main in package.json"
  BUILD_DIR=$(jq -r .main $ASSET_PATH/package.json)
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
  echo "Error: no BUILD_DIR found 😐"
  exit 1
fi

echo "----------------------------------"
echo "use BUILD_DIR = $BUILD_DIR"

echo "copy assets data from $ASSET_PATH/$BUILD_DIR to $OUTPUT_PATH/$ASSET_PATH/"
mkdir -p "$OUTPUT_PATH/$ASSET_PATH"
cp -r "$ASSET_PATH/$BUILD_DIR" "$OUTPUT_PATH/$ASSET_PATH/"
cp "$ASSET_PATH/package.json" "$OUTPUT_PATH/$ASSET_PATH/package.json"
if [ -f "$ASSET_PATH/COMMUNICATOR.md" ]; then
  cp -n "$ASSET_PATH/COMMUNICATOR.md" "$OUTPUT_PATH/$ASSET_PATH/COMMUNICATOR.md"
fi
cp "$ASSET_PATH/README.md" "$OUTPUT_PATH/$ASSET_PATH/README.md"

echo "create $OUTPUT_PATH/$ASSET_PATH/package.tgz"
cd "$OUTPUT_PATH/$ASSET_PATH"
# todo use npm-pack instead https://docs.npmjs.com/cli/v6/commands/npm-pack
tar --exclude="package.tgz" -czf package.tgz .

# Version handling, this is only relevant for lib
echo "Check Version..."
VERSION=$(jq -r .version $ASSET_PATH/package.json)
echo "Version: $VERSION"
echo "$OUTPUT_PATH/$ASSET_PATH/last-build-version"
if [ -f "$OUTPUT_PATH/$ASSET_PATH/last-build-version" ]; then
  LAST_VERSION=$(cat $OUTPUT_PATH/$ASSET_PATH/last-build-version)
  if [[ "$VERSION" != "$LAST_VERSION" ]]; then
    echo "New Version found!"
    echo $VERSION >$OUTPUT_PATH/$ASSET_PATH/new-version-found
  fi
fi
echo $VERSION >$OUTPUT_PATH/$ASSET_PATH/last-build-version

echo "----------------------------------"
echo "Build for $ASSET_NAME done 🙂"
echo "----------------------------------"
echo "Results:"
ls -la
echo "=================================="
