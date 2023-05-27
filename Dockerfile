FROM golang:1.19-bullseye as builder

RUN go install -trimpath go.k6.io/xk6/cmd/xk6@latest

RUN xk6 build --output "/tmp/k6" --with github.com/grafana/xk6-browser

FROM debian:bullseye

RUN apt-get update && \
    apt-get install -y chromium && \
    apt-get install -y openjdk-11-jdk

# Install Node.js and NPM
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Install Playwright dependencies
RUN apt-get install -y libnss3-dev libx11-xcb-dev libxcb-dri3-dev libxcomposite1 libxcursor1 libxi6 libxtst6 libgtk-3-0

# Install Playwright with its browsers
RUN npm i playwright

COPY --from=builder /tmp/k6 /usr/bin/k6

ENV XK6_HEADLESS=true
ENV PLAYWRIGHT_JSON_OUTPUT_NAME=results.json

# Set the working directory
WORKDIR /app

# Copy everything from the local directory to the Docker image
COPY . /app

RUN JAVA_HOME="$(dirname $(dirname $(readlink -f $(which javac))))" && \
    echo "export JAVA_HOME=$JAVA_HOME" >> /etc/profile.d/java.sh && \
    echo "export PATH=\$JAVA_HOME/bin:\$PATH" >> /etc/profile.d/java.sh && \
    chmod +x /etc/profile.d/java.sh

# Reload the environment variables
RUN . /etc/profile.d/java.sh

RUN npm install

ENTRYPOINT ["npm", "run"]
