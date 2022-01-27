'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      coinId: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      symbol: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      listedAt: {
        type: Sequelize.INTEGER
      },
      iconUrl: {
        type: Sequelize.STRING
      },
      tier: {
        type: Sequelize.INTEGER
      },
      change: {
        type: Sequelize.STRING
      },
      rank: {
        type: Sequelize.INTEGER
      },
      coinrankingUrl: {
        type: Sequelize.STRING
      },
      btcPrice: {
        type: Sequelize.STRING
      },
      '24hVolume': {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Favorites');
  }
};