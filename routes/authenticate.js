// GENERALS
const route = require("express").Router();
const authenticate = require("../controllers/authenticate.js");

module.exports = (app) => {
  app.use('/', route);
  
	route.post('/login', authenticate.validateLogin);

};