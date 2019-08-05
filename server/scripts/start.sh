#!/bin/bash
export ENV=dev
export DB_DEV=postgres
export DB_PASS_DEV=Cocoloc1907
export DB_HOST=postgres
export JWT_SECRET=supersecret
export CLIENT_NAME=coroblex-client
export CLIENT_PORT=3000
export SERVER_NAME=coroblex-server
export SERVER_PORT=4000
export POSTGRES_NAME=postgres
export POSTGRES_PORT=5432
export CLOUDINARY_URL=cloudinary://368498368866195:Ka9ls0xhkGL4iUm7P_rs5MUv53s@coroblex

# set -a
# . .env
# set +a

docker-compose -f docker-compose.dev.yml up --build