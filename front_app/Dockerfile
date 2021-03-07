FROM node:13.12.0-alpine
RUN mkdir /static
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
CMD ["npm", "rebuild", "node-sass"]
