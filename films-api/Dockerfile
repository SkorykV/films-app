FROM node:14-alpine

ARG API_PORT=4000

RUN mkdir /films-api

WORKDIR /films-api

EXPOSE ${API_PORT}

COPY package.json package-lock.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD ["npm", "run", "start:dev"]