#!/usr/bin/env bash

# Run command while ignoring non-zero exit code
set +e

# Upload to S3
aws s3 sync \
    --acl public-read \
    ./playwright-report \
    s3://coincover/ui/${date=$(date '+%Y-%m-%d')}
upload_code=$?

# All 3 commands should have succeeded (code=0) for the script to be consider successful
exit $((upload_code))