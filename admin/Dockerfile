FROM node:14-buster
ENV PYTHONUNBUFFERED 1
RUN mkdir /static
RUN mkdir /provider
RUN mkdir /app
COPY ./provider /app/provider
WORKDIR /app
COPY package.json /app/package.json
RUN yarn install
