FROM mhart/alpine-node:9.4

RUN apk update && apk add graphicsmagick

RUN mkdir -p /var/app
WORKDIR /var/app

COPY . .

RUN yarn install

EXPOSE 80

CMD [ "yarn", "start" ]
