const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/UsersController')
const oauthMiddleware = require('../middlewares/oauthMiddleware')

router.get('/', oauthMiddleware.verifyAuth, UsersController.findAll)
router.post('/signup', UsersController.signUp)
router.post('/signin', UsersController.signIn)

module.exports = router
