FROM node:12-alpine as builder
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
RUN npm run start