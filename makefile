build:
	npm run build && docker build -t 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest .

run-pt:
	docker run -v $(PWD):/app 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest demo:pt

run-ui:
	docker run -v $(PWD):/app 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest demo:ui

run-api:
	docker run -v $(PWD):/app 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest demo:api

report:
	docker run -v $(PWD):/app 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest report

