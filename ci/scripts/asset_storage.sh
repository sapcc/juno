#!/bin/bash

# exit on error commended because we want to print the debug log
# set -e

if [ ! -f "CODEOWNERS" ]; then
  echo "This script must run from root of juno repo"
  exit 1
fi

function help() {
  echo "Usage: asset_storage.sh --asset-name||-am --asset-path||-ap --asset-type||-at --action|-a --container||-c --root-path||-rp --debug||-d --dry-run||-dr --checksum||-cs
  --asset-name -> if no asset-name is fiven the whole folder that is 
                  defined with the --asset-type option is downloaded
  --asset-path -> optional like apps/asset-name, if set --asset-type is ingnored
  --asset-type -> app || lib
  --action     -> upload ||download || sync || delete || create-checksum
                  * upload -> upload assets to swift/asset-path from given root-path/asset-path/
                  * download -> download assets from swift to the current path
                  * sync -> sync assets to swift/asset-path from given root-path/asset-path/
                  * delete -> delete assets from swift/asset-path
                  * create-checksum -> create a checksum for the given asset-path
  --container  -> where to upload or download assets
  --root-path  -> this is needed for upload, download and sync and create-checksum and is the path where the asset-path is located
                  in other words the complete path is root path + asset-path
                  default is /tmp/build_result
  --debug      -> default is 'false'
  --dry-run    -> default is 'false', this is only valid if you use the sync mode and is useful to prevent data loss 😉
  --checksum   -> optional, if set it is used to check if the asset hase changed before delete

  # Examples for apps/whois

  * create-checksum: ./ci/scripts/asset_storage.sh --action create-checksum --asset-path apps/whois/ --root-path .
  * delete ./ci/scripts/asset_storage.sh --container juno-pending-assets --action delete --asset-path apps/whois/ --debug true
  * delete with check: ./ci/scripts/asset_storage.sh --container juno-pending-assets --action delete --asset-path apps/whois/ --debug true --checksum 123456789
  * upload: ./ci/scripts/asset_storage.sh --container juno-pending-assets --action upload --asset-path apps/auth/ --root-path . --debug true
  * download: ./ci/scripts/asset_storage.sh --container juno-pending-assets --action download --asset-path apps/auth/ --root-path . --debug true
  * sync: ./ci/scripts/asset_storage.sh --container juno-pending-assets --action sync --asset-path apps/auth/ --root-path . --debug true --dry-run true

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
  --asset-name | -an)
    ASSET_NAME="$2"
    shift # past argument
    shift # past value
    ;;
  --asset-type | -at)
    ASSET_TYPE="$2"
    if [[ "$ASSET_TYPE" != *"s" ]]; then
      ASSET_TYPE="${ASSET_TYPE}s"
    fi
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
  --checksum | -cs)
    GIVEN_CHECKSUM="$2"
    shift # past argument
    shift # past value
    ;;
  --debug | -d)
    DEBUG="$2"
    shift # past argument
    shift # past value
    ;;
  --dry-run | -dr)
    DRY_RUN="$2"
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

if [[ "$ACTION" != "create-checksum" ]]; then
  if [[ -z "$CONTAINER" ]]; then
    echo "Error: no CONTAINER given"
    exit 1
  fi
fi

if [[ -z "$ACTION" ]]; then
  echo "Error: no ACTION given"
  exit 1
fi

if [[ -z "$ASSET_PATH" ]]; then
  if [[ -n "$ASSET_TYPE" ]]; then
    ASSET_PATH="$ASSET_TYPE/$ASSET_NAME"
  else
    echo "Warning: no ASSET_PATH given"
    #exit 1
  fi
fi

if [[ -z "$ROOT_PATH" ]]; then
  ROOT_PATH="/tmp/build_result"
fi

if [[ "$ACTION" == "upload" ]] || [[ "$ACTION" == "sync" ]] || [[ "$ACTION" == "download" ]]; then
  if [ ! -d "$ROOT_PATH" ]; then
    echo "Error: directory ROOT_PATH $ROOT_PATH does not exist"
    exit 1
  fi
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

if [[ "$ACTION" != "create-checksum" ]]; then

  echo "=================================="
  if [[ -n "$ASSET_NAME" ]]; then
    echo "### $ACTION asset $ASSET_NAME ###"
    echo "----------------------------------"
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
  if [[ -n "$ASSET_TYPE" ]]; then
    echo "use ASSET_TYPE  = $ASSET_TYPE"
  fi
  echo "use ASSET_PATH  = $ASSET_PATH"
  echo "use ASSET_NAME  = $ASSET_NAME"
  echo "use CONTAINER   = $CONTAINER"
  echo "----------------------------------"

  OUTPUT="/dev/null"
  if [[ "$DEBUG" == "true" ]]; then
    echo "Log for $ACTION:" >/tmp/swift-debug.log
    OUTPUT="/tmp/swift-debug.log"
  fi
fi

function sync() {
  echo "Swift sync from $ROOT_PATH/$ASSET_PATH to container $CONTAINER and destination $ASSET_PATH"
  # https://rclone.org/commands/rclone_sync/
  # Important: Since this can cause data loss, test first with the --dry-run or the --interactive/-i flag.
  # use "rclone sync --dry-run  "$ASSET_PATH" juno:$CONTAINER/$ASSET_PATH" for a dry run
  if [ -z "$(ls -A "$ASSET_PATH")" ]; then
    echo "The directory $ASSET_PATH is empty, noting sync to swift..."
  else
    if [[ "$DRY_RUN" == "true" ]]; then
      rclone sync --dry-run "$ASSET_PATH" "juno:$CONTAINER/$ASSET_PATH"
    else
      rclone sync --verbose "$ASSET_PATH" "juno:$CONTAINER/$ASSET_PATH" &>>$OUTPUT &&
        echo "----------------------------------" &&
        echo "sync done 🙂"
    fi
  fi
}

# https://docs.openstack.org/ocata/cli-reference/swift.html
function upload() {
  echo "Swift upload from $ROOT_PATH/$ASSET_PATH to container $CONTAINER and destination $ASSET_PATH"
  if [ -z "$(ls -A "$ASSET_PATH")" ]; then
    echo "The directory $ASSET_PATH is empty, noting upload to swift..."
  else
    swift upload --skip-identical --changed "$CONTAINER" "$ASSET_PATH" &>>$OUTPUT &&
      echo "----------------------------------" &&
      echo "upload done 🙂"
  fi
}

function download() {
  echo "Swift download from container $CONTAINER and path $ASSET_PATH to $ROOT_PATH/$ASSET_PATH"

  # ignore path args if ASSET_PATH is empty
  # reason to download the whole container
  PATH_ARG="-p $ASSET_PATH"
  if [[ -z "$ASSET_PATH" ]]; then
    PATH_ARG=""
  fi

  #echo "swift download --skip-identical $CONTAINER $PATH_ARG"
  swift download --skip-identical "$CONTAINER" $PATH_ARG &>>$OUTPUT &&
    echo "----------------------------------" &&
    echo "download done 🙂"
}

function delete() {
  if [[ -n "$GIVEN_CHECKSUM" ]]; then
    delete_check
  fi
  echo "Swift delete from container $CONTAINER $ASSET_PATH"
  if [[ -z "$ASSET_PATH" ]]; then
    echo "Error: no ASSET_PATH given"
    exit 1
  fi
  echo "swift delete $CONTAINER --prefix $ASSET_PATH"
  swift delete "$CONTAINER" --prefix "$ASSET_PATH" &>>$OUTPUT &&
    echo "----------------------------------" &&
    echo "delete done 🙂"
}

function delete_check() {
  ROOT_PATH="/tmp/asset_storage"
  mkdir -p $ROOT_PATH
  echo "Check delete - first download to $ROOT_PATH"
  echo "first download to $ROOT_PATH" &>>$OUTPUT
  cd $ROOT_PATH || exit
  download
  echo "create checksum for $ROOT_PATH/$ASSET_PATH" &>>$OUTPUT
  create_checksum
  echo "generated checksum: $CHECKSUM" &>>$OUTPUT
  echo "given checksum: $GIVEN_CHECKSUM" &>>$OUTPUT
  if [[ "$CHECKSUM" != "$GIVEN_CHECKSUM" ]]; then
    echo "Error: checksums are not equal, remote changed cowardly refuse to delete 🫣"
    print_debug
    # for debugging: print all hidden chars
    # cat -A <<<"$GIVEN_CHECKSUM"
    # cat -A <<<"$CHECKSUM"
    exit 1
  fi
}

function create_checksum() {

  if [ ! -d "$ROOT_PATH/$ASSET_PATH" ]; then
    echo "ERROR: PATH $ROOT_PATH/$ASSET_PATH not found"
    exit 1
  fi

  CHECKSUM="$(find $ROOT_PATH/$ASSET_PATH -type f -exec sha512sum {} \; | sort | sha512sum)"
  CHECKSUM=${CHECKSUM::-3} #remove last two chars (" -") from string
  if [[ "$ACTION" == "create-checksum" ]]; then
    echo "$CHECKSUM"
  else
    echo "----------------------------------"
    echo "create checksum for $ROOT_PATH/$ASSET_PATH"
    echo "$CHECKSUM"
    echo "----------------------------------"
    echo "cleanup $ROOT_PATH"
    rm -rf "$ROOT_PATH"
  fi
}

function print_debug() {
  if [[ "$DEBUG" == "true" ]]; then
    if [ -f "/tmp/swift-debug.log" ]; then
      echo "----------------------------------"
      cat /tmp/swift-debug.log
      echo "----------------------------------"
      rm -f /tmp/swift-debug.log
    else
      echo "Note: no debug log file found"
    fi
    echo "=================================="
  fi
}

if [[ "$ACTION" == "upload" ]] || [[ "$ACTION" == "sync" ]] || [[ "$ACTION" == "download" ]]; then
  cd "$ROOT_PATH" || exit
  if [[ "$ACTION" != "download" ]]; then
    if [ ! -d "$ASSET_PATH" ]; then
      echo "Error: directory ASSET_PATH $ASSET_PATH does not exist"
      exit 1
    fi
  fi
fi

# juno-assets -> our own stuff
# juno-assets-3rd-party -> 3rd party stuff that we want to build
if [[ "$ACTION" == "upload" ]]; then
  upload
fi
if [[ "$ACTION" == "download" ]]; then
  download
fi
if [[ "$ACTION" == "sync" ]]; then
  sync
fi
if [[ "$ACTION" == "delete" ]]; then
  delete
fi
if [[ "$ACTION" == "create-checksum" ]]; then
  create_checksum
fi

print_debug
