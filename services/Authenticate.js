let uuid = require('uuid');
uuid = uuid.v1;
const jwt = require('jsonwebtoken');
const clientIP = require('request-ip');
const models = require("../models");
const Sequelize = models.Sequelize;
const sequelize = models.sequelize;
const Op = Sequelize.Op;

// SERVICES
const User = require('./User');
// UTILS
const config = require('../config');
const logger = require('../loaders/logger');
const { mysqlDate } = require('../utils');

module.exports = class Authenticate {
	// GENERATE A TOKEN
	static async GenerateToken(client, req, generateSession) {
		generateSession =
			typeof generateSession != 'undefined' ? (generateSession != true ? false : true) : true;
		try {
			let updatedClient = await User.updateLoginHistory({
				email: client.email,
				ip_address: clientIP.getClientIp(req),
				last_login: mysqlDate(),
			});

			if(!updatedClient){
				return false;
			}

			const { id, name, email, ip } = updatedClient;

			const jwtclaims = {
				id,
				name,
				email,
				ip,
				token: 'access',
				expire: config.jwt.expire,
			};
			const refreshclaims = {
				id,
				name,
				email,
				ip,
				token: 'refresh',
				expire: config.jwt.renewal,
			};

			const access_token = jwt.sign(JSON.stringify(jwtclaims), config.jwt.secret);
			const refresh_token = jwt.sign(JSON.stringify(refreshclaims), config.jwt.secret);

			return { access_token, refresh_token, client: updatedClient };
		} catch (e) {
			logger.error('🔥 error: %o', e);
			return false;
		}
	}
	
	static async validSession(token){
		try{
			const decoded = jwt.verify(token, config.jwt.secret);
			const checkSession = await models.user_active_sessions.findOne({
				where: { user_id: decoded.id, access_token: token },
			});

			if (checkSession == null) {
				return res.status(403).json({ session: false });
			}
			return true;
		}catch(e){
			logger.error('🔥 error: %o', e);
			return false;
		}
	}
};
