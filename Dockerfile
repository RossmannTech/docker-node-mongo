FROM node:10.15.3-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN npm install

ADD . .

EXPOSE 3000

CMD ["npm", "start"]
