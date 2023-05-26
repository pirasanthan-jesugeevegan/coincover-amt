#!/usr/bin/env bash

# Run command while ignoring non-zero exit code
set +e

if [[ $TEST_TYPE == "pt" ]]; then
    REPORT_PATH="./dist"
else
    REPORT_PATH="./allure-report"
fi

docker run \
    -v $PWD/dist:/dist \
    ${UI_RUNNER_DOCKER_IMAGE_CACHE} \
    test:${TEST_TYPE}
cmd_code=$?  # Keep the return code for the actual test run

# Upload to S3
aws s3 sync \
    --acl public-read \
    ${REPORT_PATH} \
    s3://coincover-pj/${TEST_TYPE}/${date=$(date '+%Y-%m-%d')}
upload_code=$?  # Keep the return code for the actual test run

# Generate report
if [ $upload_code -eq 0 ]; then
    export ${TEST_TYPE}
    export ${USER_NAME}
    node ms-teams.js
    report_code=$?
fic


# All 3 commands should have succeeded (code=0) for the script to be consider successful
exit $((cmd_code + report_code + upload_code))
