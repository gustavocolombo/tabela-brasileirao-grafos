FROM node:lts-alpine

WORKDIR /home/api

COPY package*.json .
COPY yarn.lock .

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD npm run start:dev