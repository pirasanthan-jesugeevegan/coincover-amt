FROM golang:1.19-bullseye as builder

RUN go install -trimpath go.k6.io/xk6/cmd/xk6@latest

RUN xk6 build --output "/tmp/k6" --with github.com/grafana/xk6-browser

FROM debian:bullseye-slim

RUN apt-get update && apt-get install -y chromium wget curl && \
    rm -rf /var/lib/apt/lists/*

RUN wget https://github.com/allure-framework/allure2/releases/download/2.14.0/allure-2.14.0.tgz && \
    tar -zxvf allure-2.14.0.tgz -C /opt/ && \
    ln -s /opt/allure-2.14.0/bin/allure /usr/bin/allure && \
    rm allure-2.14.0.tgz

RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y libnss3-dev libx11-xcb-dev libxcb-dri3-dev libxcomposite1 libxcursor1 libxi6 libxtst6 libgtk-3-0 && \
    rm -rf /var/lib/apt/lists/*

RUN npm i -g playwright && \
    rm -rf ~/.npm

COPY --from=builder /tmp/k6 /usr/bin/k6

ENV XK6_HEADLESS=true
ENV PLAYWRIGHT_JSON_OUTPUT_NAME=results.json

WORKDIR /app

COPY package.json package-lock.json /app/

RUN JAVA_HOME="$(dirname $(dirname $(readlink -f $(which javac))))" && \
    echo "export JAVA_HOME=$JAVA_HOME" >> /etc/profile.d/java.sh && \
    echo "export PATH=\$JAVA_HOME/bin:\$PATH" >> /etc/profile.d/java.sh && \
    chmod +x /etc/profile.d/java.sh

RUN . /etc/profile.d/java.sh

RUN npm install --only=production && \
    rm -rf ~/.npm

COPY . /app

ENTRYPOINT ["npm", "run"]
