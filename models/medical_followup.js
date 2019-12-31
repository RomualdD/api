/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medical_followup', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    current_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    result: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    next_date_check: {
      type: DataTypes.DATE,
      allowNull: true
    },
    id_pbvhfjt_users: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'pbvhfjt_medical_followup'
  });
};
