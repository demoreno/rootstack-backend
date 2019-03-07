const db = require('../models')
const PlacesSchemas = require('../schemas/placesSchemas')
const PlacesModel = db.model('Places', PlacesSchemas)

module.exports = PlacesModel
