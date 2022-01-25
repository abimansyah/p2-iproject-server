const { User,Favorite } = require('../models/index')

const authorization = async (req,res,next) => {
  try {

    const {id} = req.params

    const favorites = await Favorite.findOne({
      where:{
        id: id
      }
    })
    if(favorites) {
      if(favorites.userId === req.currentUser.id){
        next()
      } else {
        throw{name:'Forbidden'}
      }
    }else {
      throw{name:'FavoriteNotFound'}
    }
    
  } catch (err) {
    next(err)
  }
}

module.exports = {authorization}