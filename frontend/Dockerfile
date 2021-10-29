FROM node:14-alpine

WORKDIR /app

RUN apk add python3

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "serve"]