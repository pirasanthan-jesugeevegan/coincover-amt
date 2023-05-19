#!/usr/bin/env bash

# Run command while ignoring non-zero exit code
set +e

# Upload to S3
aws s3 sync \
    --acl public-read \
    ./playwright-report \
    s3://coincover-pj/
