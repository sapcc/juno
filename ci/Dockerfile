FROM keppel.eu-de-1.cloud.sap/ccloud-dockerhub-mirror/library/node:11.12-alpine

LABEL source_repository="https://github.com/sapcc/juno"

RUN apk --no-cache add git ca-certificates make
RUN npm install -g serve

RUN mkdir -p /app

ADD . /app
WORKDIR /app

RUN yarn build

CMD serve -s build