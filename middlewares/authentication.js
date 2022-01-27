const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/index')


const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = verifyToken(access_token)
    const user = await User.findByPk(payload.id)

    req.currentUser = {
      id: user.id,
      username: user.username,
      email: user.email
    }

    if (!user) {
      throw { name: 'InvalidAccess' }
    } else {
      next()
    }

  } catch (err) {
    console.log(err);
    next(err)
  }
}

module.exports = authentication