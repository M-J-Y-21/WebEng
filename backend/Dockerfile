FROM node:19.4-alpine
WORKDIR /usr/src/app/backend

COPY ./package.json ./
COPY prisma ./prisma/
RUN npm i
RUN echo "generate:"
RUN npx prisma generate
RUN echo "db push:"
RUN npx prisma db push

COPY . .

ENV NODE_ENV production

EXPOSE 3000
CMD ["npm", "run", "start:dev"]
