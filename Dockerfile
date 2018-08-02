FROM mhart/alpine-node:10

RUN mkdir -p /var/app
WORKDIR /var/app

COPY .yarnrc .npmrc package.json yarn.lock /var/app/
RUN yarn install --production

COPY . .

EXPOSE 80

CMD [ "yarn", "start" ]
