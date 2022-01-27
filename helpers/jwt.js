const jwt = require('jsonwebtoken')

const secretkey = process.env.SECRET_KEY

const createToken = (payload) => {
  return jwt.sign(payload, secretkey)
}

const verifyToken = (token) => {
  return jwt.verify(token, secretkey)
}

module.exports = {
  createToken,
  verifyToken
}