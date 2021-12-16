"use strict";
module.exports = (sequelize, Sequelize) => {
  const order = sequelize.define(
    "order",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      created_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
      indexes: [
        {
          name: "unique_field",
          unique: true,
          fields: ["code"],
        },
        {
            name: "index_name",
            fields: ["name"],
        },
      ],
    }
  );

  order.associate = function (models) {
};
  return order;
};
