const { User, Favorite } = require("../models/index");
const axios = require("axios");
const { Op } = require("sequelize");
const apiKey = process.env.COINRANKING_API;
const baseUrl = "https://api.coinranking.com/v2";

class cryptoController {
  static async getCrypto(req, res, next) {
    try {

      let parameters = {}

      const {orderBy, search, limit, offset, orderDirection} = req.query
      
      if(orderBy){
        parameters.orderBy = orderBy 
      }
      if(search){
        parameters.search = search
      }
      if(limit){
        parameters.limit = +limit
      }
      if(offset){
        parameters.offset = +offset
      }
      if(orderDirection){
        parameters.orderDirection = orderDirection
      }
      
      // console.log(search);

      const response = await axios({
        method: "get",
        url: `${baseUrl}/coins`,
        headers: {
          "x-access-token": `${apiKey}`,
        },
        params:parameters
        
      });
      res.status(200).json(response.data);
    } catch (err) {
      next(err);
    }
  }

  static async getCryptoById(req,res,next){
    try {
      const {id} = req.params

      const response = await axios({
        method: "get",
        url: `${baseUrl}/coins`,
        headers: {
          "x-access-token": `${apiKey}`,
        },   
      });

      const findCoin = response.data.data.coins.filter((e) => {
        if (id === e.uuid) {
          return e;
        }
      });

      // console.log(findCoin[0].uuid);
      if(findCoin){
        res.status(200).json(findCoin[0])
      } else {
        throw { name: "NotFound" }
      }
      
    } catch (err) {
      next(err)
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
            name: findCoin[0].name,
            symbol: findCoin[0].symbol,
            price: findCoin[0].price,
            listedAt: findCoin[0].listedAt,
            iconUrl: findCoin[0].iconUrl,
            tier: findCoin[0].tier,
            change: findCoin[0].change,
            rank: findCoin[0].rank,
            coinrankingUrl: findCoin[0].coinrankingUrl,
            btcPrice: findCoin[0].btcPrice,
            '24hVolume': findCoin[0]['24hVolume'],

          });
          
          let nameData = findCoin[0]
          res.status(201).json({
            message: `${nameData.name} has been added to your favorites`,
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
