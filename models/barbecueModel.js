const db = require('../models')
const BarbecueSchema = require('../schemas/barbecueSchema')
const BarbecueModel = db.model('Barbecue', BarbecueSchema)

module.exports = BarbecueModel