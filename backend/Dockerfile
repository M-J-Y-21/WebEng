FROM node:19.4-alpine
WORKDIR /usr/src/app/backend

COPY ./package.json ./
RUN npm i

COPY . .

ENV NODE_ENV production
ENV DATABASE_URL postgresql://postgres:123@postgres:5432/nest?schema=public

EXPOSE 3000

CMD ["sh", "./startup.sh"]
