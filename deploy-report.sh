#!/usr/bin/env bash

# Run command while ignoring non-zero exit code
set +e

# Upload to S3
aws s3 sync \
    --acl public-read \
    ./playwright-report \
    s3://coincover-pj/${TEST_TYPE}/${date=$(date '+%Y-%m-%d')}
upload_code=$?  # Keep the return code for the actual test run

# Generate report
if [ $upload_code -eq 0 ]; then
    export ${TEST_TYPE}
    node ms-teams.js
fi