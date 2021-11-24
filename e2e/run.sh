#!/bin/bash

function help_me () {
  echo "Usage: run.sh --host HOST --debug CYPRESS-DEBUG-FLAG MICRO-FRONTEND-TEST"
  echo "       run.sh --help                                                   # will print out this message"
  echo "       run.sh --host https://cdn.juno.qa-de-1.cloud.sap/ cdn           # run cdn tests"
  echo "       run.sh --host https://ui.juno.qa-de-1.cloud.sap/ ui-components  # run ui-components tests"
  echo "       run.sh --host https://juno.qa-de-1.cloud.sap/ dashboard         # run dashboard tests"
  echo "       run.sh --host http://localhost:3000 --debug 'cypress:network:*' # will show debug information about the networking"
  echo "MAC users: ./run.sh --host http://host.docker.internal:3000"
  echo ""
  echo "Debugging options: https://docs.cypress.io/guides/references/troubleshooting#Log-sources"
  echo "cypress:cli                 The top-level command line parsing problems"
  echo "cypress:server:args         Incorrect parsed command line arguments"
  echo "cypress:server:specs        Not finding the expected specs"
  echo "cypress:server:project      Opening the project"
  echo "cypress:server:browsers     Finding installed browsers"
  echo "cypress:launcher            Launching the found browser"
  echo "cypress:network:*           Adding network interceptors"
  echo "cypress:net-stubbing*       Network interception in the proxy layer"
  echo "cypress:server:reporter     Problems with test reporters"
  echo "cypress:server:preprocessor Processing specs"
  echo "cypress:server:plugins      Running the plugins file and bundling specs"
  echo "cypress:server:socket-e2e   Watching spec files"
  echo "cypress:server:task         Invoking the cy.task() command"
  echo "cypress:server:socket-base  Debugging cy.request() command"
  echo "cypress:webpack             Bundling specs using webpack"
  exit 1
}

# default: run all tests
SPECS_FOLDER="cypress/integration/**/*"
if [[ "$1" == "--help" ]]; then
  help_me
else
  while [[ $# -gt 0 ]]
  do
    key="$1"

    case $key in
        -h|--host)
        HOST="$2"
        shift # past argument
        shift # past value
        ;;
        -d|--debug)
        DEBUG="$2"
        shift # past argument
        shift # past value
        ;;
        *)    # test folder
        SPECS_FOLDER="cypress/integration/$1/*"
        shift # past argument
        ;;
    esac
  done
fi

# find the host if nothing was given
if [[ -z "${HOST}" ]]; then
  if [ -f "/usr/local/bin/wb" ]; then
    # this runs only in workspaces!!!
    APP_PORT=$(wb juno 'echo $APP_PORT' | tail -1 | tr -d '\r') 
    echo "APP_PORT     => $APP_PORT"
    HOST="http://localhost:$APP_PORT"
  fi

  if [[ -z "${APP_PORT}" ]]; then
    echo "Error: no APP_PORT found"
    help_me
  fi
fi

echo "HOST         => $HOST"
echo "SPECS FOLDER => $SPECS_FOLDER"
if [[ -n "$DEBUG" ]]; then
  echo "DEBUG:       => $DEBUG"
fi
echo ""

docker run -it --rm -v "$PWD:/e2e" -w /e2e \
  -e DEBUG="$DEBUG" \
  -e CYPRESS_baseUrl="$HOST" \
  --network=host \
  keppel.eu-de-1.cloud.sap/ccloud-dockerhub-mirror/cypress/included:7.1.0 --spec "$SPECS_FOLDER"
