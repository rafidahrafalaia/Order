const dotenv = require("dotenv");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  /**
   * App Configuration
   */
  app: {
    name: process.env.APP_NAME,
    port: parseInt(process.env.PORT, 10),
  },

	/**
	 * JSON WEB TOKEN Configurations
	 */
   jwt: {
		iss: process.env.DOMAIN,
		secret: process.env.JWT_SECRET,
		expire: process.env.JWT_EXPIRE, // in minutes
		renewal: process.env.JWT_RENEWAL, // in minutes
		round: 10,
	},

  /**
   * Display Configuration
   */
   display: {
    limits: 15,
  },

  /**
   * MariaDB Configuration
   */
   mariaDB: {
      username: process.env.MARIA_USERNAME,
      password: process.env.MARIA_PASSWORD,
      database: process.env.MARIA_DATABASE,
      port: process.env.MARIA_PORT,
      host: process.env.MARIA_HOST,
      dialect: process.env.MARIA_DIALECT
  },

  /**
   * Used by winston logger
   */
   logs: {
    level: process.env.LOG_LEVEL || "silly",
  },

};
