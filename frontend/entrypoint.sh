#!/bin/sh
echo "Start frontend container"
echo "Change user permissions $(id -u):$(id -g)"
chown $(id -u):$(id -g) -R /app/node_modules
npm install
npm run build