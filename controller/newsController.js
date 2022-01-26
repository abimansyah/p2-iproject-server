const { User, Favorite } = require("../models/index");
const axios = require("axios");
const { Op } = require("sequelize");
const apiKey = "45112680e5ee4913ba3ef73268070fc1";
const baseUrl = "https://newsapi.org/v2";

class newsController {
  static async getNews(req, res, next) {
    try {

      let parameters = {}

      const {country,q, pageSize} = req.query
      
      // if(!country){
      //   parameters.country  =  'us'
      // } else {
      //   parameters.country = country
      // }

      if(q){
        parameters.q = q
      } else {
        parameters.q = 'crypto'
      }
      if(pageSize){
        parameters.pageSize = pageSize
      } else {
        parameters.pageSize = 20
      }

      const response = await axios({
        method: "get",
        url: `${baseUrl}/top-headlines`,
        headers: {
          "X-Api-Key": `${apiKey}`,
        },
        params:parameters
        
      });
      res.status(200).json(response.data);
    } catch (err) {
      next(err);
    }
  }

}

module.exports = newsController;