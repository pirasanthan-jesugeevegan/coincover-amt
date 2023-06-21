FROM golang:1.19-bullseye as builder

RUN go install -trimpath go.k6.io/xk6/cmd/xk6@latest

RUN xk6 build --output "/tmp/k6" --with github.com/grafana/xk6-browser

FROM debian:bullseye

RUN apt-get update && \
    apt-get install -y git && \
    apt-get install -y chromium && \
    apt-get install -y openjdk-11-jdk && \
    apt-get install -y wget && \
    wget https://github.com/allure-framework/allure2/releases/download/2.14.0/allure-2.14.0.tgz && \
    tar -zxvf allure-2.14.0.tgz -C /opt/ && \
    ln -s /opt/allure-2.14.0/bin/allure /usr/bin/allure && \
    rm allure-2.14.0.tgz

# Install Node.js and NPM
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Install Playwright dependencies
RUN apt-get install -y libnss3-dev libx11-xcb-dev libxcb-dri3-dev libxcomposite1 libxcursor1 libxi6 libxtst6 libgtk-3-0

# Install Playwright with its browsers
RUN npm install -g playwright

# Install AWS CLI
RUN apt-get install -y python3-pip && \
    pip3 install awscli --upgrade

COPY --from=builder /tmp/k6 /usr/bin/k6

ENV XK6_HEADLESS=true
ENV PLAYWRIGHT_JSON_OUTPUT_NAME=results.json
# Set AWS credentials
ENV AWS_ACCESS_KEY_ID=
ENV AWS_SECRET_ACCESS_KEY=
ENV AWS_REGION=
ENV USER_NAME=

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the Docker image
COPY package.json package-lock.json /app/

RUN JAVA_HOME="$(dirname $(dirname $(readlink -f $(which javac))))" && \
    echo "export JAVA_HOME=$JAVA_HOME" >> /etc/profile.d/java.sh && \
    echo "export PATH=\$JAVA_HOME/bin:\$PATH" >> /etc/profile.d/java.sh && \
    chmod +x /etc/profile.d/java.sh

# Reload the environment variables
RUN . /etc/profile.d/java.sh

RUN npm install

# Run the Playwright install command to download browsers
RUN npx playwright install

# Copy everything from the local directory to the Docker image
COPY . /app

# Set executable permissions for the run.sh script
RUN chmod +x /app/scripts/run.sh
ENTRYPOINT ["/app/scripts/run.sh"]
