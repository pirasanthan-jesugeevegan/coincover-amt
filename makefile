build:
	npm run build && docker build -t xk6-browser .   
run:
	docker run -v $(PWD)/dist:/dist xk6-browser test:pt