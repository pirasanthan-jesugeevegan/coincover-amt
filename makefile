build:
	npm run build && docker build -t 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest .   
report:
	docker run 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest npm run allure:report
run:
	docker run -v $(PWD)/dist:/app/allure-results -w /app 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest sh -c "npm run demo:api && npm run allure:report"

look:
	docker run 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest sh -c "ls"