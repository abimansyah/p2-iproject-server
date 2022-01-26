'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Favorite.belongsTo(models.User,{foreignKey:'userId'})
    }
  }
  Favorite.init({
    userId: DataTypes.INTEGER,
    coinId: DataTypes.STRING,
    name: DataTypes.STRING,
    symbol:DataTypes.STRING,
    price: DataTypes.STRING,
    listedAt: DataTypes.INTEGER,
    iconUrl: DataTypes.STRING,
    tier: DataTypes.INTEGER,
    change: DataTypes.STRING,
    rank: DataTypes.INTEGER,
    coinrankingUrl: DataTypes.STRING,
    btcPrice: DataTypes.STRING,
    '24hVolume': DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};