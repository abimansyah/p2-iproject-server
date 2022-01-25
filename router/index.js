const express = require('express');
const app = express()
const router = express.Router();
const userController = require('../controller/userController')
const cryptoController = require('../controller/cryptoController')
const authentication = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')

router.post('/register', userController.register)
router.post('/login', userController.login)

router.get('/cryptocurrencies', cryptoController.getCrypto)

router.use(authentication)

router.get('/favorites',cryptoController.getFavorite)

router.post('/favorites/:coinId',cryptoController.postFavorite)
router.delete('/favorites/:id',authorization,cryptoController.removeFavorite)


module.exports = router