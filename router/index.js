const express = require('express');
const app = express()
const router = express.Router();
const userController = require('../controller/userController')
const cryptoController = require('../controller/cryptoController')
const newsController = require('../controller/newsController')
const authentication = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/login-google', userController.loginGoogle)

router.get('/cryptocurrencies', cryptoController.getCrypto)
router.get('/cryptocurrencies/:id', cryptoController.getCryptoById)

router.get('/news', newsController.getNews)

router.use(authentication)

router.get('/favorites',cryptoController.getFavorite)

router.post('/favorites/:coinId',cryptoController.postFavorite)
router.delete('/favorites/:id',authorization,cryptoController.removeFavorite)


module.exports = router