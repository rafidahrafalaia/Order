'use strict';
module.exports = (sequelize, Sequelize) => {
   const user_active_sessions = sequelize.define(
      'user_active_sessions',
      {
         user_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
         },
         access_token: {
            type: Sequelize.TEXT('long'),
            allowNull: false,
         },
         refresh_token: {
            type: Sequelize.TEXT('long'),
            allowNull: false,
         },
      },
      {
         underscored: true,
         timestamps: false,
         modelName: 'user_active_sessions',
      }
   );

   user_active_sessions.associate = function (models) {
   };
   return user_active_sessions;
};
