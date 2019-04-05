docker exec -it lex /bin/bash -c 'npx sequelize db:seed --seed proficiencySeeder.js'
docker exec -it lex /bin/bash -c 'npx sequelize db:seed --seed languageSeeder.js'
docker exec -it lex /bin/bash -c 'npx sequelize db:seed --seed userSeeder.js'
docker exec -it lex /bin/bash -c 'npx sequelize db:seed --seed userLanguageSeeder.js'