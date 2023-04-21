#!/bin/bash
# exit on error
set -e

if [ ! -f "CODEOWNERS" ]; then
  echo "This script must run from root of juno repo"
  exit
fi

function help() {
  echo "Usage: compose_assets.sh --asset-type||-at --source-path||-rp --kind||-k
  example: ./scripts/compose_assets.sh --asset-type apps --source-path ../workbench --dist-path ../dist
  --asset-type  -> libs|apps|apis|static
  --source-path -> default is /tmp/build_result (can be realtive and absolute)
  --kind        -> juno-assets || juno-3rd-party (default is juno-assets)
  --dist-path   -> default is /tmp/dist (must be absolute)" 
  exit
}

while [[ $# -gt 0 ]]; do
  case $1 in
  --asset-type | -at)
    ASSET_TYPE="$2"
    shift # past argument
    shift # past value
    ;;
  --dist-path | -rp)
    DIST_PATH="$2"
    shift # past argument
    shift # past value
    ;;
  --source-path | -rp)
    SOURCE_PATH="$2"
    shift # past argument
    shift # past value
    ;;
  --kind | -k)
    KIND="$2"
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

if [[ -z "$KIND" ]]; then
  KIND="juno-assets"
fi

if [[ -z "$ASSET_TYPE" ]]; then
  echo "no ASSET_TYPE given 😐"
  exit 1
fi

if [[ -z "$SOURCE_PATH" ]]; then
  SOURCE_PATH="/tmp/build_result"
fi

if [ ! -d "$SOURCE_PATH" ]; then
  echo "directory SOURCE_PATH $SOURCE_PATH does not exist 😐"
  exit 1
fi

if [[ -z "$DIST_PATH" ]]; then
  DIST_PATH="/tmp/dist"
fi

if [ ! -d "$DIST_PATH" ]; then
  echo "directory DIST_PATH $DIST_PATH does not exist 😐"
  exit 1
fi

SOURCE_PATH="$SOURCE_PATH/$KIND"
echo "use KIND        = $KIND"
echo "use ASSET_TYPE  = $ASSET_TYPE"
echo "use SOURCE_PATH = $SOURCE_PATH"
echo "use DIST_PATH   = $DIST_PATH"
echo "=================================="

cd $SOURCE_PATH/$ASSET_TYPE

function integrity_check () {
   echo "--------------------"
   echo "Run integrity check"
   echo "--------------------"
   # TODO: feedback to upload error or success to swift
}

# https://stackoverflow.com/questions/2107945/how-to-loop-over-directories-in-linux
while IFS= read -d $'\0' -r dirname ; do 
    cd $dirname
    while IFS= read -d $'\0' -r asset_dirname ; do 
      echo "=================================="
      # check file structure
      if [ -f "package.json" ]; then
        # this is the case for apps/APPNAME/package.json
        # we are in the correct dir and do not need to go deeper
        echo "dirname: $dirname"
        asset_dirname=$dirname
      else
        # in this case we go one level deeper
        echo "dirname: $asset_dirname"
        if [ -f "package.json" ]; then
          # apps/APPNAME/SOMEVERSION/package.json
          cd $asset_dirname
        else
          echo "unsupported file structure, no package.json was found in $(pwd)"
          exit 1
          # TODO: feedback to upload error or success to swift
        fi
      fi
      
      asset_name=$(cat package.json | jq -r '.name')
      asset_version=$(cat package.json | jq -r '.version')
      asset_main=$(cat package.json | jq -r '.main')
      asset_module=$(cat package.json | jq -r '.module')
      asset_peer_deps=$(cat package.json | jq -r '.peerDependencies')

      echo "name: $asset_name"
      echo "version: $asset_version"
      echo "main: $asset_main"
      echo "module: $asset_module"
      echo "peer deps: $asset_peer_deps"
      
      integrity_check

      echo "Compose $KIND distribution and $ASSET_TYPE -> ${asset_name}@${asset_version}"
      cd ..
      destination_path="$DIST_PATH/$KIND/$ASSET_TYPE"
      mkdir -p $destination_path
      echo "mv $asset_dirname \"$destination_path/${asset_name}@${asset_version}/\""
      mv $asset_dirname "$destination_path/${asset_name}@${asset_version}"
    done < <(find ./ -mindepth 1 -maxdepth 1 -type d -print0)
done < <(find ./ -mindepth 1 -maxdepth 1 -type d -print0)

# TODO: feedback to upload error or success to swift