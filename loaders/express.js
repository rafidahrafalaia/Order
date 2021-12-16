const hpp = require('hpp');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('../routes');
const helmet = require('helmet');

module.exports = (app) => {
	app.enable('trust proxy');
	app.disable('etag').disable('x-powered-by');
 
	// PREVENT ATTACKS TO EXPRESS
	app.use(helmet());
 
	// CORS MIDDLEWARE
	app.use(cors());
 
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(hpp());

	app.use('/',routes());
 
	// catch 404 and forward to error handler
	app.use((req, res, next) => {
	   const err = new Error('Not Found');
	   err['status'] = 404;
	   next(err);
	});
 
	app.use((err, req, res, next) => {
	   res.status(err.status || 500);
	   res.json({
		  errors: [
			 {
				message: err.message
			 }
		  ]
	   });
	});
};
