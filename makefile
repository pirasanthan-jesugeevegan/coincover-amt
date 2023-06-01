build:
	npm run build && docker build -t 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest .

run:
	docker run -v $(PWD):/app 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest

look:
	docker run -it 325398057325.dkr.ecr.us-east-1.amazonaws.com/coincover:latest ls /app
