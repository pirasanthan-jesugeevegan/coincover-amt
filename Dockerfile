# FROM golang:1.19-bullseye as builder

# RUN go install -trimpath go.k6.io/xk6/cmd/xk6@latest

# RUN xk6 build --output "/tmp/k6" --with github.com/grafana/xk6-browser

FROM mcr.microsoft.com/playwright:v1.24.2-focal

# COPY --from=builder /tmp/k6 /usr/bin/k6

# ENV XK6_HEADLESS=true
ENV PLAYWRIGHT_JSON_OUTPUT_NAME=results.json

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the Docker image
COPY package.json package-lock.json /app/

RUN npm install

# Copy everything from the local directory to the Docker image
COPY . /app

# Run the shell script to execute the tests and publish the results to S3
CMD ["./scripts/run.sh"]
