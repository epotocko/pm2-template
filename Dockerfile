FROM node:8 AS base

# Need curl to run health checks
RUN apt-get update && apt-get install -y curl

# Create app directory
RUN mkdir /app
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install -g pm2@3.1.3

# Builds for deployment
FROM base AS release
RUN npm install --only=production
COPY . .
CMD ["bin/run"]
