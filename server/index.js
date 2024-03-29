require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const socket = require('./socket');
const logger = require('./middleware/logger');
const routes = require('./routes');
const db = require('./db/models');

const app = express();
app.use(express.static('build'));
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(routes);
app.use((err, req, res) => {
  res.status(404).send('Not found');
});

const server = socket(app);

if (process.env.NODE_ENV === 'test') {
  module.exports = app;
} else {
  db.sequelize.sync()
    .then(() => {
      server.listen(process.env.SERVER_PORT, () => {
        console.log(`Server online at port ${process.env.SERVER_PORT}`); // eslint-disable-line no-console
      });
    });
}
