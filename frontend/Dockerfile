FROM node:14-buster
RUN mkdir /static
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --no-package-lock
RUN npm cache clean --force
#CMD ["npm", "rebuild", "node-sass"]
