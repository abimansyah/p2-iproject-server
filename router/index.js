const express = require('express');
const app = express()
const router = express.Router();
const UserController = require('../controller/userController')
const authentication = require('../middlewares/authentication')
// const {authorization} = require('../middlewares/authorization')

router.post('/register', UserController.register)
router.post('/login', UserController.login)


app.use(authentication)

module.exports = router