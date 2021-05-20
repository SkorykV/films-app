FROM node:14-alpine

ARG API_PORT=4000

RUN mkdir /films-api

WORKDIR /films-api

EXPOSE ${API_PORT}

COPY package.json package-lock.json ./

RUN npm install --only=prod && npm cache clean --force

CMD ["npm", "run", "start:dev"]