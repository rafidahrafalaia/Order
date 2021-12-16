const expressLoader = require('./express');
const logger = require('./logger');

module.exports = async app => {
   // LOAD ROUTES
   await expressLoader(app);
   logger.info('✌️ Express loaded');
};
