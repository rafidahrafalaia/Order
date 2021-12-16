const models = require("../models");
const Sequelize = models.Sequelize;
const sequelize = models.sequelize;
const Op = Sequelize.Op;

const config = require("../config");
// const { mysqlDate } = require("../utils");

module.exports = class Order {
  // FIND BY ID
  static async findById(id) {
    try {
      let result = await models.order.findByPk(id);

      if(result){
        result = result.toJSON();
        return result;
      }
      else return false;
    } catch (err) {
      throw new Error(err);
    }
  }

  // CREATE
  static async create(values) {
    let transaction, clauses;

    transaction = await sequelize.transaction();
    clauses = { ...clauses, transaction };

    try {
      const created = await models.order.create(values, clauses);
      await transaction.commit();

      const result = await Order.findById(created.id);

      return result;
    } catch (e) {
      await transaction.rollback();
      throw new Error("Failed to create order record, check submited value [DB Error]");
    }
  }
};
