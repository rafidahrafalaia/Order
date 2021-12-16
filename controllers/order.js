const models = require("../models");
const Sequelize = models.Sequelize;
const sequelize = models.sequelize;
const Op = Sequelize.Op;
const logger = require("../loaders/logger");
const { query, body, validationResult, param } = require("express-validator");
// SERVICE
const { mysqlDate } = require("../utils");
const Authenticate = require("../services/Authenticate");
const Order = require("../services/Order");

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

// // Retrieve all Order from the database.
exports.getAlOrder = async (req, res) => {
  await query("page")
    .optional()
    .not()
    .matches(/[!@#\$%\^\&*\)\(+=]+/, "g")
    .withMessage("Must not contain special character")
    .run(req);
  await query("search")
    .optional()
    .isString()
    .withMessage("search must be in string")
    .run(req);
  await query("type")
    .optional()
    .isString()
    .withMessage("type must be in string")
    .run(req);
  
  const errors = customValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
	let token = req.headers.authorization.split(' ')[1];
  const auth = await Authenticate.validSession(token);
  if(!auth){
    return res.status(401).json({ errors: 'invalid token' });
  }
  let {page, search, type} = req.query;
  if(!page)
    page = 1;
  try{
    const result = await Order.findAll(page, search, type);
    res.status(200).send(result);
  }catch (err) {
      logger.error("🔥 error: %o", err);
      throw new Error(err);
  }
}

// // Find a single Order with an id
exports.getOneOrder = async (req, res) => {
  await param("id").not().isEmpty().withMessage("Must provide an id").isUUID().withMessage("Must provide an UUID V1 format").run(req);
  
  const errors = customValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
	let token = req.headers.authorization.split(' ')[1];
  const auth = await Authenticate.validSession(token);
  if(!auth){
    return res.status(401).json({ errors: 'invalid token' });
  }
  const id=req.params.id;
  try{
    const result = await Order.findById(id);
    if(result)
      res.status(200).send(result);
    else
      res.status(404).send({message:"material is not found"});
  }catch (err) {
    logger.error("🔥 error: %o", err.stack);
    throw new Error(err);
  }
};

 // Create and Save a new Order
exports.postOrder = async (req, res) => {
  await body("name").not().isEmpty().withMessage("Must provide a name for order").isString().withMessage("Must provide a String format").run(req);
  await body("code").not().isEmpty().withMessage("Must provide a code for order").isString().withMessage("Must provide a String format").run(req);
  await body("status").not().isEmpty().withMessage("Must provide a status for order").isString().withMessage("Must provide an String format").run(req);
  
  const errors = customValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
	let token = req.headers.authorization.split(' ')[1];
  await Authenticate.validSession(token);
  const {name, code, status} = req.body;
  try{
    const order = {
      name,
      code,
      status: status,
      created_date: mysqlDate()
    };
    const result = await Order.create(order);
    if(result)
      res.status(200).send(result);
    else
      res.status(500).send({message: "server error"});
  }catch (err) {
    logger.error("🔥 error: %o", err);
    throw new Error(err);
  }
};


