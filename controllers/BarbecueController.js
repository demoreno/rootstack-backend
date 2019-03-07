const BarbecueModel = require('../models/barbecueModel')
const ObjectId = require('mongodb').ObjectID

class BarbecueController {
  findAll(req, res, next) {
    const coordinates = [req.body.latitude, req.body.longitude]
    BarbecueModel
      .find({
        "coordinates": {
          $geoWithin: {
            $centerSphere: [coordinates, 5 / 3959]
          }
        }
      })
      .populate('booking.user')
      .exec((err, barbecues) => {
        if (err) next(err)
        req.res.status(200).send(barbecues)
      })
  }

  create(req, res, next) {
    const {
      name,
      model,
      description,
      latitude,
      longitude
    } = req.body

    const barbecueObject = new BarbecueModel({
      name,
      model,
      description,
      coordinates: [latitude, longitude]
    })

    barbecueObject.save((err, barbecue) => {
      if (err) next(err)
      req.res.status(200).send(barbecue)
    })
  }

  addBooking(req, res, next) {
    const {
      id,
      user
    } = req.params
    const {
      initDate,
      finishDate,
    } = req.body

    BarbecueModel.find({
      "booking": {
        $elemMatch: {
          "initDate": {
            "$gte": new Date(initDate).toISOString()
          },
          "finishDate": {
            "$lte": new Date(finishDate).toISOString()
          }
        }
      }
    }).then((response) => {
      if (response.length === 0) {
        BarbecueModel.updateOne({
          _id: id
        }, {
          $push: {
            booking: {
              $each: [{
                initDate,
                finishDate,
                user
              }]
            }
          }
        }).exec((err, barbecue) => {
          if (err) return console.error(err)
          req.res.status(200).send(barbecue)
        })
      } else {
        req.res.status(200).send({
          message: 'The barbecue is not avalaible',
          data: null
        })
      }

    }).catch((err) => next(err));
  }
}
module.exports = new BarbecueController()