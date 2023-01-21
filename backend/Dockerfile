FROM node:19.4-alpine
WORKDIR /usr/src/app/backend

COPY ./package.json ./
RUN npm i

COPY . .

ENV NODE_ENV production

EXPOSE 3000

CMD ["sh", "./startup.sh"]