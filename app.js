const express = require('express');

const config = require('./config');
const logger = require('./loaders/logger');
const app = express();

async function startServer() {
	await require('./loaders')(app);
	app.listen(config.app.port, (err) => {
		if (err) {
			logger.error(err);
			process.exit(1);
			return;
		}
		logger.info(`
			####################################################
			🛡️ ${config.app.name} listening on port: ${config.app.port} 🛡️
			####################################################
		`);
	});
}

startServer();
