FROM node:16-alpine

WORKDIR /app

RUN apk add python3

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

CMD [ "npm", "run", "serve"]