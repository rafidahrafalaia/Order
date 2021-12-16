const models = require("../models");
const Sequelize = models.Sequelize;
const sequelize = models.sequelize;
const Op = Sequelize.Op;
const logger = require("../loaders/logger");
const jwt = require('jsonwebtoken');
const config = require('../config');
const { query, body, validationResult, param } = require("express-validator");
// SERVICE
const Authenticate = require("../services/Authenticate");
const { mysqlDate } = require("../utils");
const User = require("../services/User");

const customValidationResult = validationResult.withDefaults({
	formatter: (error) => {
	  return {
		param: error.param,
		value: error.value,
		location: error.location,
		message: error.msg,
	  };
	},
  });

exports.validateLogin = async (req, res) => {
	await body('email')
		.not()
		.isEmpty()
		.trim()
		.withMessage('Must provide an email')
		.isEmail()
		.withMessage('Incorrect email format')
		.run(req);

	await body('password')
		.not()
		.isEmpty()
		.trim()
		.withMessage('Must provide a Password')
		.isLength({ min: 5 })
		.withMessage('Password must be more than 4 characters')
		.run(req);

    const errors = customValidationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
			
	  try {
			const result = await Authenticate.GenerateToken(req.body, req, true);
			// Unauthorized domain access error
			if (!result) {
				return res.status(405).json({ errors: [{ message: "user not found" }] });
			}
				
			const { access_token, refresh_token, client } = result;

			await models.user_active_sessions.upsert({
				user_id: client.id,
				access_token,
				refresh_token,
			});
	
				res.status(200).json({
					client,
					access_jwt: access_token,
					refresh_jwt: refresh_token,
				});
			} catch (err) {
				logger.error('🔥 error: %o', err);
				return err;
			}
		// });
};
