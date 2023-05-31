build:
	npm run build && docker build -t 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest .   
report:
	docker run 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest npm run allure:report
run:
	docker run -v ${PWD}:/app 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest npm run demo:api

look:
	docker run -v ${PWD}:/app 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest sh -c "ls"