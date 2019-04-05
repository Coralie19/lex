FROM node:11

WORKDIR /app

COPY package.json /app/package.json

RUN npm install --silent

COPY . .

CMD [ "npm", "start" ];

EXPOSE 3000