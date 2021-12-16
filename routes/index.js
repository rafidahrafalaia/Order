const { Router } = require("express");

// ROUTES
const authenticate = require("./authenticate");
const order = require("./order");

module.exports = () => {
  const app = Router();

  authenticate(app);
  order(app);

  return app;
};