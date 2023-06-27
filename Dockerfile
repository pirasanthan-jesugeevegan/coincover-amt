FROM ghcr.io/pirasanthan-jesugeevegan/coincover-amt:base

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the Docker image
COPY package.json package-lock.json /app/

RUN npm install

# Copy everything from the local directory to the Docker image
COPY . /app

# Set executable permissions for the run.sh script
RUN chmod +x /app/scripts/run.sh
ENTRYPOINT ["/app/scripts/run.sh"]
