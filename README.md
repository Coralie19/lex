# LEX
Lex is a language-exchange platform built to enable language-learners from across the globe to find matching partners.
This is the front-end repo for Lex. The back end can be found at https://github.com/ahuounan/lex/tree/master

A live demo site is running at [lexonline.io](http://lexonline.io)

# Getting Started
1. git clone
2. Make sure you have docker and docker-compose
3. Rename .env.example to .env and fill in the values
4. Run docker-compose -f <filename> build (use docker-compose.dev.yml for development and docker-compose.prod.yml for production)
5. Run docker-compose -f <filename> up

# Tech Stack
- Docker

## Front-End
- React/Redux
- Socket
- In development: WebRTC

## Back-End
Node.js with
- Socket.io
- Express
- Sequelize
- PostgreSQL

# Contributors
Alan Hu
