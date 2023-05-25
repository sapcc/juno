#!/bin/bash

# exit on error
set -e

if [ ! -f "CODEOWNERS" ]; then
  echo "This script must run from root of juno repo"
  exit
fi

function help() {
  echo "Usage: build_asset.sh --asset-name||-am --asset-path||-ap --asset-type||-at --action|-a --container||-c --root-path||-rp
  example: ./ci/scripts/asset_storage.sh --asset-name assets-overview --asset-type apps --action upload --root-path ../build_result
  --asset-name -> if no asset-name is fiven the whole folder that is 
                  defined with the --asset-type option is downloaded
  --asset-path -> optional like apps/asset-name, if set --asset-type is ingnored
  --asset-type -> libs|apps|apis|static
  --action     -> upload|download

  --container  -> default is juno-assets
  --root-path  -> default is /tmp/build_result
  possible ENV Vars:
  * OS_USER_DOMAIN_NAME: per default this is not set 
  * OS_PROJECT_DOMAIN_NAME: default is ccadmin
  * OS_PROJECT_NAME: default is master
  * OS_PROJECT_ID: per default this is not set 
  * OS_AUTH_URL: default is https://identity-3.qa-de-1.cloud.sap/v3
  * OS_USERNAME: this is not optional
  * OS_PASSWORD: this is not optional"
  exit
}

if [[ "$1" == "--help" ]]; then
  help
fi

if [[ -z "$OS_USERNAME" ]]; then
  echo "no OS_USERNAME given"
  exit
fi

while [[ $# -gt 0 ]]; do
  case $1 in
  --asset-name | -an)
    ASSET_NAME="$2"
    shift # past argument
    shift # past value
    ;;
  --asset-type | -at)
    ASSET_TYPE="$2"
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
  --action | -a)
    ACTION="$2"
    shift # past argument
    shift # past value
    ;;
  --container | -c)
    CONTAINER="$2"
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

if [[ -z "$CONTAINER" ]]; then
  CONTAINER="juno-assets"
fi

if [[ -z "$ACTION" ]]; then
  echo "Error: no ACTION given 😐"
  exit 1
fi

if [[ -z "$ASSET_PATH" ]]; then
  if [[ -z "$ASSET_TYPE" ]]; then
    echo "Error: no ASSET_TYPE given 😐"
    exit 1
  fi
fi

# ASSET_TYPE will owerwrite ASSET_PATH
if [[ -n "$ASSET_TYPE" ]]; then
  ASSET_PATH="$ASSET_TYPE/$ASSET_NAME"
fi

if [ ! -d "$ASSET_PATH" ]; then
  echo "Error: directory ASSET_PATH $ASSET_PATH does not exist 😐"
  exit 1
fi

if [[ -z "$ASSET_PATH" ]]; then
  echo "Error: no ASSET_PATH given 😐"
  exit 1
fi

if [[ -z "$ROOT_PATH" ]]; then
  ROOT_PATH="/tmp/build_result"
fi

if [ ! -d "$ROOT_PATH" ]; then
  echo "Error: directory ROOT_PATH $ROOT_PATH does not exist 😐"
  exit 1
fi

if [[ -z "$OS_AUTH_URL" ]]; then
  OS_AUTH_URL="https://identity-3.qa-de-1.cloud.sap/v3"
fi

if [[ -z "$OS_PROJECT_DOMAIN_NAME" ]]; then
  OS_PROJECT_DOMAIN_NAME="ccadmin"
fi

if [[ -z "$OS_PROJECT_NAME" ]]; then
  OS_PROJECT_NAME="master"
fi

echo "=================================="
if [[ -n "$ASSET_NAME" ]]; then
  echo "### $ACTION asset $ASSET_NAME ###"
fi
echo "----------------------------------"

export OS_AUTH_VERSION=3
echo "OS_AUTH_URL: $OS_AUTH_URL"
export OS_AUTH_URL=$OS_AUTH_URL

if [[ -n "$OS_PROJECT_DOMAIN_NAME" ]]; then
  echo "OS_PROJECT_DOMAIN_NAME: $OS_PROJECT_DOMAIN_NAME"
  export OS_PROJECT_DOMAIN_NAME=$OS_PROJECT_DOMAIN_NAME
fi

echo "OS_USER_DOMAIN_NAME: $OS_USER_DOMAIN_NAME"
export OS_USER_DOMAIN_NAME=$OS_USER_DOMAIN_NAME

echo "OS_PROJECT_NAME: $OS_PROJECT_NAME"
export OS_PROJECT_NAME=$OS_PROJECT_NAME

if [[ -n "$OS_PROJECT_ID" ]]; then
  export OS_PROJECT_ID=$OS_PROJECT_ID
  echo "OS_PROJECT_ID: $OS_PROJECT_ID"
fi

echo "OS_PROJECT_ID: $OS_PROJECT_ID"
echo "OS_USERNAME: $OS_USERNAME"
export OS_USERNAME=$OS_USERNAME
export OS_PASSWORD=$OS_PASSWORD

# auth swift and set OS_STORAGE_URL and OS_AUTH_TOKEN
eval "$(swift auth)"

echo "----------------------------------"
echo "use ACTION      = $ACTION"
if [[ -n "$ASSET_TYPE" ]]; then
  echo "use ASSET_TYPE  = $ASSET_TYPE"
fi
echo "use ASSET_PATH  = $ASSET_PATH"
echo "use ASSET_NAME  = $ASSET_NAME"
echo "use CONTAINER   = $CONTAINER"
echo "----------------------------------"

# https://docs.openstack.org/ocata/cli-reference/swift.html
function upload() {
  echo "Swift upload from $ROOT_PATH to container $CONTAINER and destination $ASSET_PATH"
  cd "$ROOT_PATH"
  swift upload --skip-identical --changed "$CONTAINER" "$ASSET_PATH" >/dev/null &&
    echo "----------------------------------" &&
    echo "upload done 🙂"
}

function download() {
  echo "Swift download from container $CONTAINER $ASSET_PATH to $ASSET_PATH"
  cd "$ROOT_PATH"
  swift download --skip-identical "$CONTAINER" -p "$ASSET_PATH" >/dev/null &&
    echo "----------------------------------" &&
    echo "download done 🙂"
}

# juno-assets -> our own stuff
# juno-assets-3rd-party -> 3rd party stuff that we want to build
if [[ "$ACTION" == "upload" ]]; then
  upload
fi
if [[ "$ACTION" == "download" ]]; then
  download
fi