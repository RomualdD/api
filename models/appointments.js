/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('appointments', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    hour: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    additional_informations: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    remarque: {
      type: DataTypes.STRING(255),
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
    tableName: 'pbvhfjt_appointments'
  });
};
