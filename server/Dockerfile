FROM node:11

WORKDIR /app

COPY package.json /app/package.json

RUN npm install --silent && npm install -g nodemon --silent

RUN apt-get update && apt-get install -y netcat

COPY . .

CMD [ "npm", "start" ];

EXPOSE 3000