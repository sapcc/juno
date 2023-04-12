#!/bin/bash

# exit on error
set -e

if [ ! -f "CODEOWNERS" ]; then
  echo "This script must run from root of juno repo"
  exit
fi

function help() {
  echo "Usage: build_assets.sh --asset-name||-am --kind||-k --action|-a --container||-c --root-path||-rp
  example: ./scripts/asset_storage.sh --asset-name assets-overview --kind apps --action upload --root-path ../build_result
  --action    -> upload|download
  --kind      -> libs|apps|apis|static
  --container -> default is juno-assets
  --root-path -> default is /tmp/build_result (must be always an absolute path!)
  possible ENV Vars:
  * OS_PROJECT_DOMAIN_NAME: default is ccadmin
  * OS_PROJECT_NAME: default is master
  * OS_PROJECT_ID: this is optional
  * OS_AUTH_URL: default is https://identity-3.qa-de-1.cloud.sap/v3
  * OS_USERNAME: this is not optional
  * OS_PASSWORD: this is not optional"
  exit
}

if [[ "$1" == "--help" ]]; then
  help
fi

if [[ -z "$OS_PASSWORD" ]]; then
  echo "no OS_PASSWORD given"
  exit
fi

if [[ -z "$OS_USERNAME" ]]; then
  echo "no OS_USERNAME given"
  exit
fi

if [[ -z "$CONTAINER" ]]; then
  CONTAINER="juno-assets"
fi

while [[ $# -gt 0 ]]; do
  case $1 in
  --asset-name | -an)
    ASSET_NAME="$2"
    shift # past argument
    shift # past value
    ;;
  --kind | -k)
    KIND="$2"
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
  echo "no ASSET_NAME given 😐"
  exit 1
fi

if [[ -z "$ACTION" ]]; then
  echo "no ACTION given 😐"
  exit 1
fi

if [[ -z "$KIND" ]]; then
  echo "no KIND given 😐"
  exit 1
fi

if [[ -z "$ROOT_PATH" ]]; then
  ROOT_PATH="/tmp/build_result"
fi

ASSET_PATH="$ROOT_PATH/$KIND/$ASSET_NAME/"

if [[ -z "$OS_AUTH_URL" ]]; then
  OS_AUTH_URL="https://identity-3.qa-de-1.cloud.sap/v3"
fi

if [[ -z "$OS_PROJECT_DOMAIN_NAME" ]]; then
  OS_PROJECT_DOMAIN_NAME="Default"
fi

if [[ -z "$OS_PROJECT_NAME" ]]; then
  OS_PROJECT_NAME="master"
fi

echo "OS_AUTH_URL: $OS_AUTH_URL"
echo "OS_PROJECT_DOMAIN_NAME: $OS_PROJECT_DOMAIN_NAME"
echo "OS_USER_DOMAIN_NAME: $OS_USER_DOMAIN_NAME"
echo "OS_PROJECT_NAME: $OS_PROJECT_NAME"
echo "OS_PROJECT_ID: $OS_PROJECT_ID"
echo "OS_USERNAME: $OS_USERNAME"
echo "========================="

export OS_AUTH_VERSION=3
export OS_AUTH_URL=$OS_AUTH_URL
export OS_USER_DOMAIN_NAME=$OS_PROJECT_DOMAIN_NAME
export OS_PROJECT_DOMAIN_NAME=$OS_PROJECT_DOMAIN_NAME
export OS_PROJECT_NAME=$OS_PROJECT_NAME
export OS_PASSWORD=$OS_PASSWORD
export OS_USERNAME=$OS_USERNAME

if [[ -n "$OS_PROJECT_ID" ]]; then
  export OS_PROJECT_ID=$OS_PROJECT_ID
fi

# auth swift and set OS_STORAGE_URL and OS_AUTH_TOKEN
eval $(swift auth)

DESTINATION="$KIND/$ASSET_NAME"
echo "use ACTION      = $ACTION"
echo "use KIND        = $KIND"
echo "use ASSET_NAME  = $ASSET_NAME"
echo "use ASSET_PATH  = $ASSET_PATH"
echo "use CONTAINER   = $CONTAINER"
echo "use DESTINATION = $DESTINATION"
echo "============================"

# https://docs.openstack.org/ocata/cli-reference/swift.html
function upload() {
  echo "Swift container upload from $ASSET_PATH to container $CONTAINER and destination $DESTINATION"
  #cd "$ASSET_PATH"
  #swift upload --skip-identical --changed "$DESTIONATION" .
  cd $ROOT_PATH
  #echo "Command: swift upload --skip-identical --changed $CONTAINER $DESTINATION"
  swift upload --skip-identical --changed "$CONTAINER" "$DESTINATION" &&
    echo "upload done 🙂"
}

function download() {
  echo "Swift container download from container $CONTAINER $DESTINATION to $ASSET_PATH"
  cd "$ROOT_PATH"
  #echo "Command: swift download --skip-identical $CONTAINER $DESTINATION"
  swift download --skip-identical "$CONTAINER" -p "$DESTINATION" &&
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
