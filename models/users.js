"use strict";
module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      salt: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      banned: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      date_created: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      registered_domain: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      current_membership: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      membership_valid_until: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      membership_remember_renewal: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      last_activity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      verified: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      verification_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ip_address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "active",
        values: ["active", "inactive"],
      },
    },
    {
      underscored: true,
      timestamps: false,
      modelName: "users",
    }
  );

  users.associate = function (models) {
   };
  return users;
};
