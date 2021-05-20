FROM node:14-alpine

ARG UI_PORT=3000

RUN mkdir /films-ui

WORKDIR /films-ui

EXPOSE ${UI_PORT}

COPY package.json yarn.lock ./

RUN yarn install && yarn cache clean

COPY . .

CMD ["yarn", "start"]