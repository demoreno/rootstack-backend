const express = require('express')
const router = express.Router()
const PlacesController = require('../controllers/PlacesController')
const oauthMiddleware = require('../middlewares/oauthMiddleware')

router.get('/', oauthMiddleware.verifyAuth, PlacesController.findAll)
router.post('/', oauthMiddleware.verifyAuth, PlacesController.create)
router.put('/add-comment/:id/:user', oauthMiddleware.verifyAuth, PlacesController.addComment)

module.exports = router
