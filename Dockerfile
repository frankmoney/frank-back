FROM mhart/alpine-node:10

RUN mkdir -p /var/app
WORKDIR /var/app

COPY package.json yarn.lock .
RUN yarn install --production

COPY . .

EXPOSE 80

CMD [ "yarn", "start" ]
