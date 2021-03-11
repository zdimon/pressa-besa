FROM node:14-buster
RUN mkdir /static
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --no-package-lock
RUN apt-get install libglu1
RUN apt-get install libxi6 libgconf-2-4
CMD ["npm", "rebuild", "node-sass"]
