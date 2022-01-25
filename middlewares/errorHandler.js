
const errorHandler = (err, req, res, next) => {

  switch (err.name) {
    case 'JsonWebTokenError':
      res.status(401).json({ message: 'Invalid Token' })
      break;
    case 'InvalidAccess':
      res.status(401).json({ message: "Invalid Access" })
      break;
    case 'Forbidden':
      res.status(403).json({ message: 'Unauthorized' })
      break;
    case 'TokenExpiredError':
      res.status(401).json({ message: 'Token Expired' })
      break;
    case 'NotFound':
      res.status(404).json({ message: 'Coin Not Found' })
      break;
    case 'InvalidEmailOrPassword':
      res.status(401).json({message: 'Invalid Email or Password!' })
      break
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({ message: err.errors[0].message })
      break;
    case 'FavoriteNotFound':
      res.status(400).json({ message: 'Favorite Not Found'})
      break;
    case 'SameCoin':
      res.status(400).json({ message: 'Cannot Add the Same Coin To Your Favorites'})
      break;
    default:
      res.status(500).json({ message: 'Internal Server Error' })
      break;
  }
}

module.exports = errorHandler;
