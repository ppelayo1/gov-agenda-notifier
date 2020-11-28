require('dotenv').config();

const PORT = process.env.PORT || 3002;
const serverless = require('serverless-http');
const express = require('express');
const logger = require('./utilities/logger');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

if (process.env.IS_LAMBDA) {
  logger.info('Exporting lambda handler');
  exports.uploadHandler = serverless(app);
} else {
  app.listen(PORT, () => {
    logger.info(`🚀 Auth service running on: http://localhost:${PORT}/`);
  });
}
