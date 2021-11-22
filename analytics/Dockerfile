FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .

RUN npm run prebuild

CMD npm run start:debug
