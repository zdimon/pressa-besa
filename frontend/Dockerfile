FROM node:14-buster
ENV PYTHONUNBUFFERED 1
RUN mkdir /static
WORKDIR /app
COPY package.json /app/package.json
RUN yarn install
#RUN npm install --no-package-lock
#RUN npm cache clean --force
#RUN apt-get update
#RUN apt-get install -y sudo
#RUN adduser ${USER} sudo
#RUN echo "USERRRRRR"
#RUN echo ${UID}
#RUN echo ${GID}
#CMD ["npm", "rebuild", "node-sass"]
