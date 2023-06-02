#!/usr/bin/env bash

# Run command while ignoring non-zero exit code
set +e

if [[ $TEST_TYPE == "pt" ]]; then
    REPORT_PATH="./dist"
else
    REPORT_PATH="./allure-report"
fi

docker run \
    -v $PWD:/app \
    ${ECR_REGISTRY}/coincover:latest \
    demo:${TEST_TYPE}
cmd_code=$?  # Keep the return code for the actual test run

# Generate report only if its UI || API test
if [[ $TEST_TYPE != "pt" ]]; then
docker run \
    -v $PWD:/app \
    ${ECR_REGISTRY}/coincover:latest \
    report
fi

# Upload to S3
aws s3 sync \
    --acl public-read \
    ${REPORT_PATH} \
    s3://coincover-pj/${TEST_TYPE}/${date=$(date '+%Y-%m-%d')}
upload_code=$?  # Keep the return code for the actual test run

# Send notifcation to Teams
if [ $upload_code -eq 0 ]; then
    export ${TEST_TYPE}
    export ${USER_NAME}
    node ms-teams.js
    notification_code=$?
fi


# All 3 commands should have succeeded (code=0) for the script to be consider successful
exit $((cmd_code + upload_code + notification_code))
