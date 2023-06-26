#!/usr/bin/env bash
set -ex

CR_PATH=ghcr.io${GIT_USERNAME}
AMT_RUNNER_DOCKER_IMAGE=${CR_PATH}/${GITHUB_REPOSITORY}
AMT_RUNNER_DOCKER_IMAGE_CACHE=${AMT_RUNNER_DOCKER_IMAGE}:latest
AMT_RUNNER_DOCKER_IMAGE_REV=${AMT_RUNNER_DOCKER_IMAGE}:${GITHUB_SHA}

# Build image with current revision, caching from latest
docker pull -q ${AMT_RUNNER_DOCKER_IMAGE_CACHE}
docker build \
  --cache-from ${AMT_RUNNER_DOCKER_IMAGE_CACHE} \
  -t ${AMT_RUNNER_DOCKER_IMAGE_REV} \
  .

docker push -q ${AMT_RUNNER_DOCKER_IMAGE_REV}

if [ $GITHUB_REF == "refs/heads/master" ]
then
    docker tag ${AMT_RUNNER_DOCKER_IMAGE_REV} ${AMT_RUNNER_DOCKER_IMAGE_CACHE}
    docker push -q ${AMT_RUNNER_DOCKER_IMAGE_CACHE}
fi