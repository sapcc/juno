ARG KEPPEL_HOSTNAME

FROM $KEPPEL_HOSTNAME/ccloud-dockerhub-mirror/library/node:14-alpine
ARG APP_NAME
ARG LIBS

LABEL source_repository="https://github.com/sapcc/juno/apps"

RUN apk --no-cache add git ca-certificates make

# create tmp folder
RUN mkdir -p /tmp/repo
# copy the whole repo to /tmp/repo
ADD . /tmp/repo

# install node modules, build libs and app
RUN cd /tmp/repo/ && \
  yarn install 1>/dev/null ; \
  yarn workspaces focus $LIBS $APP_NAME 1>/dev/null ; \
  yarn build-libs ;\
  yarn workspace $APP_NAME build 

# create working dir
RUN mkdir -p /app
WORKDIR /app

# copy app build to working dir
RUN cp -r /tmp/repo/apps/$APP_NAME/* /app/