/* eslint quotes: 0 quote-props: 0 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, 'logfile.json');
const logfileExists = fs.existsSync(logPath);
let logs;
if (logfileExists) logs = JSON.parse(fs.readFileSync(logPath));
else logs = [];

function logger(log) {
  logs.push(log);
  fs.writeFileSync(logPath, JSON.stringify(logs));
}

module.exports = {
  "development": {
    "username": process.env.DB_DEV,
    "password": process.env.DB_PASS_DEV,
    "database": process.env.DB_DEV,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "logging": logger,
  },
  "test": {
    "username": process.env.DB_TEST,
    "password": process.env.DB_PASS_TEST,
    "database": process.env.DB_TEST,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "logging": false,
  },
  "production": {
    "username": process.env.DB_PROD,
    "password": process.env.DB_PASS_PROD,
    "database": process.env.DB_PROD,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
  },
};
