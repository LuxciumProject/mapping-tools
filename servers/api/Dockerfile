ARG version=16.17.1
FROM node:${version}-alpine

WORKDIR /usr/app

COPY ./ /usr/app

RUN npm install || cat /root/.npm/_logs/*.log

CMD node ./dist/main.js

EXPOSE 80
