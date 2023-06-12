#!/usr/bin/env bash
set -e

usage()
{
    echo "run.sh:  this script runs cypress, generate a test report and upload it to S3."
    echo "" # new line
    echo "Params"
    echo "--env       What environment you want to run the test on."
    echo "--type      Type of test to run."
    echo "--product   Test are tagged, you can run tagged test." 
    echo "--file      File to run Performance test." 
    echo "-h, --help     Will show this message"
    echo "" # new line
}


# defaults
env=''
type=''
product=''
file=''
# defaults list
listOfEnv=("dev" "stage")
listOfType=("api" "ui" "pt")
listOfProduct=("tp" "dr" "demo" "test")

while [ "$1" != "" ]; do
    case $1 in
        --env )                      
            if [[ ! " ${listOfEnv[@]} " =~ " ${2} " ]]; then
                echo "Invalid value for --env. Allowed values are 'dev' or 'stage'."
                exit 1
            fi 
            env="$2"
            ;;
        --type )
               if [[ ! " ${listOfType[@]} " =~ " ${2} " ]]; then
                echo "Invalid value for --type. Allowed values are 'api', 'ui' or 'pt'."
                exit 1
            fi                       
            type="$2"
            ;;
        --product )
            if [[ ! " ${listOfProduct[@]} " =~ " ${2} " ]]; then
                echo "Invalid value for --product. Allowed values are 'tp', 'dr', 'demo' or 'test'."
                exit 1
            fi                        
            product="$2"
            ;;
        --file )                       
            file="$2"
            ;;
        -h | --help )                   
            usage
            exit
            ;;
    esac
    shift
done

export ENV=$env

# Display the values of the parameters
echo "Env: $env"
echo "Type of Test: $type"
echo "Product to Test: $product"
echo "File to Test: $file"


if [ "$type" != "pt" ]; 
then
    report_path="./allure-report"
    npx playwright test --grep "@$product" -c ./config/$type-playwright.config.ts --reporter=json,list,allure-playwright
    npm run report
else
    report_path="./dist"
    npm run build && k6 run --out json=test_results.json dist/$file.pt.js
fi

# Upload to S3
aws s3 sync \
    --acl public-read \
    ${report_path} \
    s3://coincover-pj/${type}/${date=$(date '+%Y-%m-%d')}
upload_code=$?  # Keep the return code for the actual test run


# Send notifcation to Teams
if [ $upload_code -eq 0 ]; then
    export ${TEST_TYPE=$type}
    export ${USER_NAME}
    node ms-teams.js
    notification_code=$?
fi


# All 3 commands should have succeeded (code=0) for the script to be consider successful
exit $((upload_code + notification_code))