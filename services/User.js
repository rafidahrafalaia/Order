const _ = require('lodash');
const models = require('../models');
const Sequelize = models.Sequelize;
const sequelize = models.sequelize;
const Op = Sequelize.Op;

// UTILS
const config = require('../config');
const logger = require('../loaders/logger');
const { mysqlDate } = require('../utils');

module.exports = class User {
	// UPDATE USER HISTORY LOGIN
	static async updateLoginHistory({ email, ip_address, last_login }) {
		let values, transaction, clauses;

		transaction = await sequelize.transaction();
		clauses = { ...clauses, where: { email }, transaction };

		// USER
		values = { ...values, ip_address, last_login };

		try {
			await models.users.update(values, clauses);

			await transaction.commit();

			const result = await models.users.findOne({
				where: { email },
				attributes: [
					'id',
					'name',
					'email',
					['ip_address', 'ip'],
					'date_created',
				],
			});
			if (!result) {
				return false;
			}
			return result.toJSON();
		} catch (err) {
			await transaction.rollback();
			logger.error(err);
			throw new Error(
				'Failed to update user login history record, check submited value [DB Error]',
			);
		}
	}

};
