FROM node:12-alpine as builder
RUN mkdir /static
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
