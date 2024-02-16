#!/bin/bash

function help() {
  echo "Usage: swift.sh --action|-a --container||-c --checksum||-cs --root-path|-rp --options|-o --target|-t 

  example: 
  
  * swift.sh --action upload --container my-container --root-path /path/to/upload --target this/will/uploaded/ --options '--skip-identical --changed'
  * swift.sh --action download --container my-container --root-path /path/to/download --target this/will/downloaded/ --options '--skip-identical'

  possible ENV Vars:
  * OS_USER_DOMAIN_NAME: per default this is not set 
  * OS_PROJECT_DOMAIN_NAME: default is ccadmin
  * OS_PROJECT_NAME: default is master
  * OS_PROJECT_ID: per default this is not set 
  * OS_AUTH_URL: default is https://identity-3.qa-de-1.cloud.sap/v3
  * OS_USERNAME: this is not optional
  * OS_PASSWORD: this is not optional
  "
  exit
}

if [[ "$1" == "--help" ]]; then
  help
fi

if [[ -z "$OS_USERNAME" ]]; then
  echo "no OS_USERNAME given"
  exit 1
fi

while [[ $# -gt 0 ]]; do
  case $1 in
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
  --target | -t)
    TARGET="$2"
    shift # past argument
    shift # past value
    ;;
  --options | -o)
    OPTIONS="$2"
    shift # past argument
    shift # past value
    ;;
  --checksum | -cs)
    GIVEN_CHECKSUM="$2"
    shift # past argument
    shift # past value
    ;;
  --root-path | -rp)
    ROOT_PATH="$2"
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

# check if all required ENV Vars are set

if [[ -z "$ROOT_PATH" ]]; then
  echo "no ROOT_PATH given"
  exit 1
fi

if [[ -z "$ACTION" ]]; then
  echo "no ACTION given"
  exit 1
fi

if [[ -z "$CONTAINER" ]]; then
  echo "no CONTAINER given"
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
echo "use CONTAINER   = $CONTAINER"
echo "use ROOT_PATH   = $ROOT_PATH"
echo "use TARGET      = $TARGET"
echo "use OPTIONS     = $OPTIONS"
echo "----------------------------------"

function upload() {
  echo "Swift upload from $(pwd) to container $CONTAINER and destination $TARGET"
  if [ -z "$(ls -A "$TARGET")" ]; then
    echo "The directory $TARGET is empty, noting upload to swift..."
  else
    if [[ -z "$OPTIONS" ]]; then
      OPTIONS="--skip-identical --changed"
    fi
    echo "swift upload $OPTIONS $CONTAINER $TARGET"
    swift upload $OPTIONS $CONTAINER $TARGET
  fi
}

function download() {
  echo "Swift download container $CONTAINER and target $TARGET to $ROOT_PATH"

  if [[ -z "$OPTIONS" ]]; then
    OPTIONS="--skip-identical"
  fi
  echo "swift download $OPTIONS $CONTAINER $TARGET"
  swift download $OPTIONS $CONTAINER $TARGET

}

function delete() {
  echo "not implemented, comming soon"
}

function create_checksum() {
  echo "not implemented, comming soon"
}

if [ -d "$ROOT_PATH" ]; then
  cd "$ROOT_PATH"
  if [[ "$ACTION" == "upload" ]]; then
    upload
  fi
  if [[ "$ACTION" == "download" ]]; then
    download
  fi
  if [[ "$ACTION" == "delete" ]]; then
    delete
  fi
  if [[ "$ACTION" == "create-checksum" ]]; then
    create_checksum
  fi
else
  echo "Error: directory ROOT_PATH $ROOT_PATH does not exist"
  exit 1
fi
