#!/bin/bash

function help_me () {
  echo "Usage: run.sh --host HOST* MICRO-FRONTEND-TESTS*"
  echo "       run.sh --help will print out this message"
  echo "       run.sh --host https://cdn.juno.qa-de-1.cloud.sap/ cdn"
  echo "       run.sh --host https://ui.juno.qa-de-1.cloud.sap/ ui-components"
  echo "       run.sh --host https://juno.qa-de-1.cloud.sap/ dashboard"
  echo "Note: if you run this on our workspaces with installed juno-env you can just use 'run.sh' or 'run.sh MICRO-FRONTEND-TESTS'"
  echo "      the script will figure out where juno is runing and will run the e2e tests against it"
  exit 1
}

if [[ "$1" == "--help" ]]; then
  help_me
fi

if [[ "$1" == "--host" ]]; then
  shift
  HOST=$1
  shift
fi

if [[ -z "${HOST}" ]]; then
  if [ -f "/usr/local/bin/wb" ]; then
    # this runs in workspaces!!!
    APP_PORT=$(wb juno 'echo $APP_PORT' | tail -1 | tr -d '\r') 
    echo "APP_PORT: $APP_PORT"
    HOST="http://localhost:$APP_PORT"
  fi

  if [[ -z "${APP_PORT}" ]]; then
    echo "Error: no APP_PORT found"
    help_me
  fi
fi

# default: run all tests
SPECS_FOLDER="cypress/integration/**/*"

# check to only run tests against special part like cdn or dashbaord etc...
while [[ $# -gt 0 ]]
do
  # test folder
  SPECS_FOLDER="cypress/integration/$1/*"
  shift # past argument
done

echo "HOST           = ${HOST}"
echo "SPECS FOLDER   = ${SPECS_FOLDER}"

# specs_folder="cypress/integration/**/*"

# if [ -n "$1" ]; then 
#    specs_folder="cypress/integration/$1/*"
# fi
# echo "$specs_folder"

# docker run -it -v "$PWD:/e2e" -w /e2e --network=host -e CYPRESS_baseUrl="http://localhost:$APP_PORT" cypress/included:7.1.0 --spec "$specs_folder"

docker run -it -v "$PWD:/e2e" -w /e2e --network=host -e CYPRESS_baseUrl="$HOST" keppel.eu-de-1.cloud.sap/ccloud-dockerhub-mirror/cypress/included:7.1.0 --spec "$SPECS_FOLDER"