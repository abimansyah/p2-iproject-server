const { User } = require('../models/index')
const {compareHash} = require('../helpers/bcrypt') 
const {createToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

class UserController {

  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body
      const objUser = {
        username: username,
        email: email,
        password: password
      }
      const newUser = await User.create(objUser)
      res.status(201).json({
        message: 'Register Success', 
        id: newUser.id,
        username: username, 
        email: newUser.email 
      })

    } catch (err) {
      next (err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      const findUser = await User.findOne({
        where: {
          email
        }
      })
      if (!findUser) {
        throw {name: 'InvalidEmailOrPassword'}
      }
      if(!compareHash(password, findUser.password)) {
        throw {name: 'InvalidEmailOrPassword'}
      }

      const payload = {
        id: findUser.id,
        email: findUser.email,
      }
      const token = createToken(payload)

      res.status(200).json({
        access_token: token,
      })

    } catch (err) {
      // console.log(err);
      next(err)
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const {token} = req.body
      const clientId = process.env.CLIENT_ID
      const client = new OAuth2Client(clientId);

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientId
      })

      const payload = ticket.getPayload();
      // console.log(payload);

      let [user, created] = await User.findOrCreate({
        where: { 
          email: payload.email 
        },
        defaults: {
          password: 'testtest',
          email:payload.email,
          username: payload.username,
        }
      });

      const payloadServerToClient = {
        id: user.id,
        email: user.email,
      }
      
      const googleToken = createToken(payloadServerToClient)

      res.status(200).json({
        access_token: googleToken,
        id: payloadServerToClient.id,
        email: payloadServerToClient.email
      })

    } catch (err) {
      next(err)
    }
  }

  


}

module.exports = UserController