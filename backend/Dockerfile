FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src src
COPY test test
COPY assets assets
COPY .env ./
COPY nest-cli.json ./
COPY ts*.json ./

CMD ["npm", "run", "start:dev"]