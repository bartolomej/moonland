FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm i
RUN npm i -g @nestjs/cli

COPY . .

RUN npm run prebuild

CMD npm run start:debug
