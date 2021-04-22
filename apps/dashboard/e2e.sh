#!/bin/bash

APP_PORT=$(wb juno 'echo $APP_PORT | tr -d "\n\r"')

echo "http://localhost:$APP_PORT"
docker run -it -v "$PWD:/e2e" -w /e2e --network=host -e CYPRESS_baseUrl="http://localhost:$APP_PORT" cypress/included:7.1.0