const express = require('express')
const router = express.Router()
const BarbecueController = require('../controllers/BarbecueController')
const oauthMiddleware = require('../middlewares/oauthMiddleware')

router.get('/', BarbecueController.findAll)
router.post('/', BarbecueController.create)
router.put('/create-booking/:id/:user', BarbecueController.addBooking)

module.exports = router