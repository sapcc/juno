#!/bin/bash

printf "Usage: 
./run.sh --host https://cdn.juno.qa-de-1.cloud.sap/ cdn
./run.sh --host https://ui.juno.qa-de-1.cloud.sap/ ui-components
./run.sh --host https://juno.qa-de-1.cloud.sap/ dashboard

"

APP_PORT=$(wb juno 'echo $APP_PORT' | tail -1)
HOST="http://localhost:$APP_PORT"

SPECS_FOLDER="cypress/integration/**/*"

while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -h|--host)
    HOST="$2"
    shift # past argument
    shift # past value
    ;;
    *)    # test folder
    SPECS_FOLDER="cypress/integration/$1/*"
    shift # past argument
    ;;
esac
done

echo "HOST           = ${HOST}"
echo "SPECS FOLDER   = ${SPECS_FOLDER}"

# specs_folder="cypress/integration/**/*"

# if [ -n "$1" ]; then 
#    specs_folder="cypress/integration/$1/*"
# fi
# echo "$specs_folder"

# docker run -it -v "$PWD:/e2e" -w /e2e --network=host -e CYPRESS_baseUrl="http://localhost:$APP_PORT" cypress/included:7.1.0 --spec "$specs_folder"

docker run -it -v "$PWD:/e2e" -w /e2e --network=host -e CYPRESS_baseUrl="$HOST" cypress/included:7.1.0 --spec "$SPECS_FOLDER"