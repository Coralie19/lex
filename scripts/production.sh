cd client
npm run build
cd ..
docker-compose -f docker-compose.prod.yml build 
docker-compose -f docker-compose.prod.yml up