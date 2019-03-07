const PlacesModel = require('../models/placesModels')
const ObjectId = require('mongodb').ObjectID

class PlacesController {
  findAll (req, res, next) {
    PlacesModel
      .find()
      .populate('comments.user')
      .exec((err, places) => {
        if (err) {
          return res.status(500).json({
            message: err,
            data: []
          })
        }
        req.res.status(200).send(places)
      })
  }

  create (req, res, next) {
    const {
      name,
      address,
      comment,
      userId
    } = req.body

    const placesObject = new PlacesModel({
      name: name,
      address: address,
      comments: [{
        body: comment,
        user: ObjectId(userId)
      }]
    })

    placesObject.save((err, places) => {
      if (err) return console.error(err)
      req.res.status(200).send(places)
    })
  }

  addComment (req, res, next) {
    const {
      id,
      user
    } = req.params
    const {
      comment
    } = req.body

    PlacesModel.updateOne({
      _id: id
    }, {
      $push: {
        comments: {
          $each: [{
            body: comment,
            user: user
          }]
        }
      }
    }).exec((err, places) => {
      if (err) return console.error(err)
      req.res.status(200).send(places)
    })
  }
}
module.exports = new PlacesController()
