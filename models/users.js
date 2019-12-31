/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    lastname: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    mail: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    phone2: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    language: {
      type: DataTypes.CHAR(5),
      allowNull: true
    },
    keyverif: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    qrcode: {
      type: DataTypes.TEXT(),
      allowNull: true
    },
    id_pbvhfjt_role: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'role',
        key: 'id'
      }
    },
    id_pbvhfjt_pathology: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'pathology',
        key: 'id'
      }
    }
  }, {
    tableName: 'pbvhfjt_users'
  });
};
