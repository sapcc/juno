ARG KEPPEL_HOSTNAME

FROM $KEPPEL_HOSTNAME/ccloud-dockerhub-mirror/library/node:14-alpine
ARG APP_NAME

LABEL source_repository="https://github.com/sapcc/juno/apps"

RUN apk --no-cache add git ca-certificates make

# create tmp folder
RUN mkdir -p /tmp/repo
# copy the whole repo to /tmp/repo
ADD . /tmp/repo

# install node modules, build libs and app
RUN cd /tmp/repo/ && yarn install; yarn build-libs; yarn workspace $APP_NAME build 

# create working dir
RUN mkdir -p /app
WORKDIR /app

# copy app build to working dir
RUN cp -r /tmp/repo/apps/$APP_NAME/* /app/