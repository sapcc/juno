# This image is used to up and download our build assets to and from swift
# docker run --rm -it --name juno-swift -v /workspace/juno:/juno -v /workspace/temp/:/juno-assets juno-swift:latest /bin/bash

FROM keppel.eu-de-1.cloud.sap/ccloud-dockerhub-mirror/library/node:bullseye-slim AS base

LABEL source_repository="https://github.com/sapcc/juno"

RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install --yes git ca-certificates rsync jq python3-pip 

ARG SWIFT_CLIENT_VERSION="3.9.0"
RUN pip3 --no-cache-dir install python-swiftclient==${SWIFT_CLIENT_VERSION} python-keystoneclient

# this is used later in shared tasks to get access to ci scripts
ADD ./ci/scripts /ci/scripts 

WORKDIR /ci 
