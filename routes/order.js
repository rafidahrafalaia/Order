// GENERALS
const route = require("express").Router();
const order = require("../controllers/order.js");
const authenticate = require("../controllers/authenticate.js");

module.exports = (app) => {
	app.use("/order", route);
  
	route.post("/", order.postOrder);

	route.get("/:id", order.getOneOrder);
};