FROM node:16.14.2-alpine3.15

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]
