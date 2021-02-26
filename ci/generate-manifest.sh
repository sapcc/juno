#!/bin/bash

BUILD_DIR=$1
if [ -z "$BUILD_DIR" ]; then
  echo "ERROR: build dir not given!"
  exit
fi

cd $BUILD_DIR || exit
declare -A versions_hash
for app in */*; do
  app_and_version=(${app//\// })
  app=${app_and_version[0]}
  if [ "$app" != "$app_old" ]; then
    version=()
  fi
  version+=(${app_and_version[1]})
  versions_hash[$app]="${version[@]}"
  app_old=$app
done

data=""
for app in "${!versions_hash[@]}"; do
  data+="\"$app\":["
  versions=""
  for version in ${versions_hash[$app]}; do
    versions+="\"$version\","
  done
  # remove als comma
  data+=$(echo -n $versions | sed 's/.$//')
  data+="],"
done

echo -n "{"
echo -n $data | sed 's/.$//' # print data and remove last comma
echo -n "}"
