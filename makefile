build:
	npm run build && docker build -t xk6-browser .   
run:
	docker run -v $(PWD)/dist:/dist 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest test:api