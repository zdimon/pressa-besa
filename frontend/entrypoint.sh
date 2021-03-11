#!/bin/sh
echo "Start frontend container"
chown $(id -u):$(id -g) -r /app/node_modules
echo "Change user permissions"
npm install
npm run build