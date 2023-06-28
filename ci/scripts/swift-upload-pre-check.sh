#!/bin/bash

if [[ -z "$UPLOAD_DIR" ]]; then
  echo "Error: upload dir not given"
  exit 1
fi

if [ ! -d "$UPLOAD_DIR" ]; then
  echo "Error: upload dir '$UPLOAD_DIR' not found"
  exit 1
fi

cd "$UPLOAD_DIR" || exit 1

# to prevent weird error messages from the asset_storage script check the given params
if [[ -z "$CONTAINER" ]]; then
  echo "Error: no container given"
  exit 1
fi
if [[ -z "$ASSET_NAME" ]]; then
  echo "Error: no asset name given"
  exit 1
fi
if [[ -z "$TYPE" ]]; then
  echo "Error: no type given. allowed values are 'lib' or 'app'"
  exit 1
fi

# prepare compatible structure for upload
# apps/NAME/content
# libs/NAME/content
export ASSET_PATH="${TYPE}s/${ASSET_NAME}"
if [ -e "$ASSET_PATH" ]; then
  echo "Info: file structure in upload are compatible 👍"
else
  echo "Warning: file structure in upload not compatible will move everything to upload/$ASSET_PATH"
  mkdir -p "/juno_tmp/$ASSET_PATH"
  mv * "/juno_tmp/$ASSET_PATH"
  cd /juno_tmp/ || exit 1
  mv * "$UPLOAD_DIR"
fi

cd /juno || exit 1
