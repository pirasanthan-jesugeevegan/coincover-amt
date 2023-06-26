include .env

build:
	npm run build && docker build --platform linux/arm64 -t 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest .

run-pt:
	docker run -v $(PWD):/app 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest demo:pt

run-ui:
	docker run -v $(PWD):/app 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest demo:ui

run-api:
	docker run \
	-e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
    -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
    -e AWS_REGION=${AWS_REGION } \
    -e USER_NAME=${ACTOR } \
	-v $(PWD):/app \
	325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest \
	--env dev --type api --product demo --file demo \

report:
	docker run -v $(PWD):/app 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest report
