const { User, Favorite } = require("../models/index");
const axios = require("axios");
const { Op } = require("sequelize");
const apiKey = "coinranking67ceb3740d22973212ae3bbcc229bc34a6452656205598b9";
const baseUrl = "https://api.coinranking.com/v2";

class cryptoController {
  static async getCrypto(req, res, next) {
    try {
      const response = await axios({
        method: "get",
        url: `${baseUrl}/coins`,
        headers: {
          "x-access-token": `${apiKey}`,
        },
      });
      res.status(200).json(response.data);
    } catch (err) {
      next(err);
    }
  }

  static async postFavorite(req, res, next) {
    try {
      const { coinId } = req.params;

      const findFavorite = await Favorite.findOne({
        where: {
          userId: req.currentUser.id,
          coinId: coinId
        },
      });

      if (findFavorite) {
        throw { name: "SameCoin" };
      } else {

        const coin = await axios({
          method: "get",
          url: `${baseUrl}/coins`,
          headers: {
            "x-access-token": `${apiKey}`,
          },
        });

        // console.log(coin.data);
        const findCoin = coin.data.data.coins.filter((e) => {
          if (coinId === e.uuid) {
            return e;
          }
        });
        // console.log(coin.data.data.coins);
        // console.log(findCoin);

        if (findCoin.length !== 0) {
          await Favorite.create({
            userId: req.currentUser.id,
            coinId: req.params.coinId,
          });
          res.status(201).json({
            message: "Coin has been added to your favorites",
          });
        } else {
          throw { name: "NotFound" };
        }
      }
    } catch (err) {
      next(err);
    }
  }

  static async getFavorite(req, res, next) {
    try {
      const favorites = await Favorite.findAll({
        where: {
          userId: req.currentUser.id,
        },
        order: [["createdAt", "desc"]],
      });

      res.status(200).json(favorites);
    } catch (err) {
      next(err);
    }
  }

  static async removeFavorite(req, res, next) {
    try {
      const { id } = req.params;
      const findFavorite = await Favorite.findOne({
        where: +id,
      });
      if (findFavorite) {
        await Favorite.destroy({
          where: { id },
        });
        res
          .status(200)
          .json({ message: `You have removed this coin from your favorites` });
      } else {
        throw { name: "FavoriteNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = cryptoController;
