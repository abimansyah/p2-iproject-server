'use strict';
const {createHash} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
  
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Username Required!'
        }
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email is Required!'
        },
        notNull: {
          msg: 'Email is Required!'
        },
        isEmail: {
          msg: 'Wrong Email Format!'
        },
      },
      unique: {
        msg: 'Email Must be Unique'
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is Required!'
        },
        notNull: {
          msg: 'Password is Required!'
        },
        len: {
          args: [5],
          msg: "Minimum 5 characters required in password!"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, options) => {
    const hashPassword = createHash(instance.password)
    instance.password = hashPassword
  });

  return User;
};