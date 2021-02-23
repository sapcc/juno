FROM keppel.eu-de-1.cloud.sap/ccloud-dockerhub-mirror/library/node:12-alpine

LABEL source_repository="https://github.com/sapcc/juno/apps/dashboard"

RUN apk --no-cache add git ca-certificates make
RUN npm install -g serve

RUN mkdir -p /app

WORKDIR /app
ADD ./apps/dashboard/package.json ./apps/dashboard/yarn.lock /app/

RUN yarn install

ADD ./apps/dashboard /app

RUN yarn build

CMD serve -s build