#!/usr/bin/env bash
set -ex

source scripts/common.sh

# Build image with current revision, caching from latest
docker pull -q ${UI_RUNNER_DOCKER_IMAGE_CACHE}
docker build \
  --cache-from ${UI_RUNNER_DOCKER_IMAGE_CACHE} \
  -t ${UI_RUNNER_DOCKER_IMAGE_REV} \
  .

docker push -q ${UI_RUNNER_DOCKER_IMAGE_REV}

if [ $GITHUB_REF == "refs/heads/master" ]
then
    docker tag ${UI_RUNNER_DOCKER_IMAGE_REV} ${UI_RUNNER_DOCKER_IMAGE_CACHE}
    docker push -q ${UI_RUNNER_DOCKER_IMAGE_CACHE}
fi