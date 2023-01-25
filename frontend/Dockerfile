FROM node:19.4-alpine
WORKDIR /usr/src/app/frontend

COPY ./package.json ./
RUN npm i

COPY . .

ENV NODE_ENV production
# needed for https://github.com/facebook/create-react-app/issues/11779
ENV WDS_SOCKET_PORT 0

EXPOSE 3000
CMD ["npm", "start"]
