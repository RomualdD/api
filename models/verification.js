/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('verification', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    verification: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    one_hour: {
      type: DataTypes.TIME,
      allowNull: true
    },
    two_hour: {
      type: DataTypes.TIME,
      allowNull: true
    },
    three_hour: {
      type: DataTypes.TIME,
      allowNull: true
    },
    four_hour: {
      type: DataTypes.TIME,
      allowNull: true
    },
    notification: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    verification_date: {
      type: DataTypes.STRING(40),
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
    tableName: 'pbvhfjt_verification'
  });
};
