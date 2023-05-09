#!/bin/bash
function help() {
  echo "Usage: check_for_name_collisions.sh --juno-assets-path||-j --third-party-assets-path||-t --help||-h
  --juno-assets-path path to juno assets  
  --third-party-assets-path path to third-party assets"
  exit
}

while [[ $# -gt 0 ]]; do
  case $1 in
  --juno-assets-path | -j)
    JUNO_ASSETS_PATH="$2"
    shift # past argument
    shift # past value
    ;;
  --third-party-assets-path | -t)
    THIRD_PARTY_ASSETS_PATH="$2"
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

arr=($(jq -r '.name' $JUNO_ASSETS_PATH/**/package.json))
# make arr unique
juno_assets=($(echo "${arr[@]}" | tr ' ' '\n' | sort -u | tr '\n' ' '))

arr=($(jq -r '.name' $THIRD_PARTY_ASSETS_PATH/**/package.json))
# make arr unique
third_party_assets=($(echo "${arr[@]}" | tr ' ' '\n' | sort -u | tr '\n' ' '))

printf '%s\n' "${juno_assets[@]}"
printf '%s\n' "${third_party_assets[@]}"

for item1 in $juno_assets; do
  for item2 in $third_party_assets; do
    if [[ $item1 = $item2 ]]; then
      echo "Name collision found, 3rd party asset $item2 collides with juno asset $item1"
      exit 1
    fi
  done
done
