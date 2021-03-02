#!/bin/bash

usage () {
  echo "Clean up the no longer needed images in keppel"
  echo "Usage:"
  echo -e "\t keppel_cleanup.sh [flags] [options]"

  echo "Examples:"
  echo -e "\tkeppel_cleanup.sh --region=qa-de-1 --application-id=OPENSTACK_APPLICATION_ID --secret=OPENSTACK_APPLICATION_SECRET --account=ccloud --repository=juno-cdn\n"
  
  echo "Flags:"
  echo -e "\t-h --help"
  echo -e "\t-dr --dry-run='': <required> dry run"
  echo -e "\t-e --region='': <required> openstack region"
  echo -e "\t-i --id='': <required> openstack application id (only the id is needed but it can start with 'applicationcredential-')"
  echo -e "\t-s --secret='': <required> openstack application secret"
  echo -e "\t-a --account='': <required> keppel account name"
  echo -e "\t-r --repository='': <required> kepperl repository"
  echo -e ""
  echo -e "Options:"
  echo -e "\t-u --remove-untagged=true: remove untagged images"
  echo -e "\t-c --preserve-count=10: number of the last images that are not deleted"
  echo -e ""
}

REMOVE_UNTAGGED="true"
PRESERVE_COUNT="10"

while [ "$1" != "" ]; do
    PARAM=$(echo "$1" | awk -F= '{print $1}')
    VALUE=$(echo "$1" | awk -F= '{print $2}')
    case $PARAM in
        -h | --help)
            usage
            exit
            ;;
        -v | --verbose) VERBOSE=${VALUE-true} ;;   
        -dr | --dry-run) DRY_RUN=${VALUE-true}  ;;  
        -e | --region) REGION=$VALUE ;;
        -i | --id) APPLICATION_ID=$VALUE ;;
        -s | --secret) APPLICATION_SECRET=$VALUE ;;
        -a | --account) ACCOUNT=$VALUE ;;
        -r | --repository) REPOSITORY=$VALUE ;;
        -c | --preserve-count) PRESERVE_COUNT=$VALUE ;;                        
        -u | --remove-untagged)
            if [ "$VALUE" = "false" ]; then 
              REMOVE_UNTAGGED="false"
            fi    
            ;;
        *)
            echo "ERROR: unknown parameter \"$PARAM\""
            usage
            exit 1
            ;;
    esac
    shift
done

if [ -z "$REGION" ] || [ -z "$APPLICATION_ID" ] || [ -z "$APPLICATION_SECRET" ] || [ -z "$ACCOUNT" ] || [ -z "$REPOSITORY" ]; then 
echo "ERROR: one or more of the required flags are missing --region, --id, --secret, --account or --repository" 
echo "" && usage
exit 1
fi

# get token from keystone using application_credentials method
APPLICATION_ID="${APPLICATION_ID#'applicationcredential-'}"
TOKEN=$(curl -X POST -H "Content-Type:application/json" https://identity-3.$REGION.cloud.sap/v3/auth/tokens -d "{\"auth\": {\"identity\": {\"methods\": [\"application_credential\"], \"application_credential\": {\"id\": \"$APPLICATION_ID\", \"secret\": \"$APPLICATION_SECRET\" }  } } }" -s -o /dev/null -D - | grep x-subject-token)
TOKEN=${TOKEN#'x-subject-token: '}
# echo $TOKEN

if [ -n "$VERBOSE" ]; then
  echo "VERBOSE: $VERBOSE"   
  echo "DRY_RUN: $DRY_RUN"  
  echo "REGION: $REGION"
  echo "APPLICATION_ID: $APPLICATION_ID"
  echo "APPLICATION_SECRET: $APPLICATION_SECRET"
  echo "ACCOUNT: $ACCOUNT"
  echo "REPOSITORY: $REPOSITORY"
  echo "PRESERVE_COUNT: $PRESERVE_COUNT"                        
  echo "REMOVE_UNTAGGED: $REMOVE_UNTAGGED"
fi


# remove function
remove () {
  repo="$1"
  shift
  array=("$@")

  # echo "===================="
  # echo "$repo"
  # printf '%s\n' "${array[@]}"
  for digest in "${array[@]}"; do
    id="${digest%\"}"
    id="${id#\"}"

    if [ "$VERBOSE" == "true" ]; then 
      echo "delete: https://keppel.$REGION.cloud.sap/keppel/v1/accounts/$ACCOUNT/repositories/$repo/_manifests/$id"
    fi
                    
    if [ "$DRY_RUN" == "true" ] ; then
      echo "dry run mode"
    else
      curl -X DELETE -H "X-Auth-Token:$TOKEN" "https://keppel.$REGION.cloud.sap/keppel/v1/accounts/$ACCOUNT/repositories/$repo/_manifests/$id" 
    fi 

  done
}

mapfile -t repositories <<< "$(echo "$REPOSITORY" | tr ',' "\n")"

for repo in "${repositories[@]}"; do

  # try to split repository by ":"
  # it allows to override global PRESERVE_COUNT for specific repository 
  mapfile -t repo_conf <<< "$(echo "$repo" | tr ':' "\n")"
  repo="${repo_conf[0]}"
  preserve="${repo_conf[1]-$PRESERVE_COUNT}"

  if (( "$preserve" < 1 )); then
    echo "=== ERROR"
    echo "PRESERVE_COUNT must not be smaller than 1"
    continue
  fi  

  # get manifests from keppel API
  manifests=$(curl -H "X-Auth-Token:$TOKEN" https://keppel.$REGION.cloud.sap/keppel/v1/accounts/$ACCOUNT/repositories/$repo/_manifests 2>/dev/null)

  # continue if repo not found
  if [ "$manifests" == 'not found' ]; then
    echo "=== REPO NOT FOUND"
    echo "$repo not found in https://keppel.$REGION.cloud.sap/keppel/v1/accounts/$ACCOUNT"
    echo "Does the repo \"$repo\" really exist?"
    continue
  fi

  echo ""

  # remove untagged images
  if [ "$REMOVE_UNTAGGED" = "true" ]; then
      echo "=== REMOVE UNTTAGED FROM $repo"
      digests=$(jq -r '.manifests | map(select(.tags == null)) | map(.digest) | .[] ' <<< "$manifests")

      mapfile -t untagged <<< "$digests"

      # remove empty elements
      for i in "${!untagged[@]}"; do
        [ -n "${untagged[$i]}" ] || unset "untagged[$i]"
      done

      echo "TO BE REMOVED ${#untagged[@]}"
      echo ""
      remove "$repo" "${untagged[@]}"
      echo ""
  fi

  # remove all but preserved
  if [ -n "$preserve" ]; then
      echo "=== REMOVE IMAGES FROM $repo (preserve $preserve)"
      digests=$(jq '.manifests | map(select(.tags != null)) | sort_by(.pushed_at) | map(.digest) | reverse[]' <<< "$manifests")

      mapfile -t array <<< "$digests"
      # remove empty elements
      for i in "${!array[@]}"; do
        [ -n "${array[$i]}" ] || unset "array[$i]"
      done

      # remove preserved images from array
      to_be_removed=( "${array[@]:$preserve}" )
      echo "TO BE REMOVED ${#to_be_removed[@]} of ${#array[@]}"
      echo ""
      remove  "$repo" "${to_be_removed[@]}"
  fi
done