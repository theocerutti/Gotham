FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src src
COPY vue.config.js ./
COPY .env ./
COPY public public

CMD [ "npm", "run", "serve" ]