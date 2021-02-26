FROM keppel.eu-de-1.cloud.sap/ccloud-dockerhub-mirror/library/node:14-alpine

LABEL source_repository="https://github.com/sapcc/juno/apps"

RUN apk --no-cache add git ca-certificates make
RUN npm install -g serve

RUN mkdir -p /app

WORKDIR /app
ADD ./package.json ./yarn.lock /app/

RUN yarn install

ADD . /app

RUN yarn build