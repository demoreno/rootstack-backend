const UsersModel = require('../models/usersModel')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const config = require('../config/')

class PlacesController {
  findAll(req, res, next) {
    UsersModel.find().exec().then((users) => {
      req.res.status(200).send(users)
    }).catch((err) => next(err))
  }

  signUp(req, res, next) {
    const {
      username,
      firstName,
      lastName,
      address,
      email
    } = req.body
    let {
      password
    } = req.body

    if (!username || !password) {
      req.res.status(412).send({
        success: false,
        message: 'Please pass username and password.'
      })
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return next(err)
        }
        bcrypt.hash(password, salt, null, (err, hash) => {
          if (err) {
            return res.status(500).json({
              message: err,
              data: []
            })
          }
          password = hash

          const newUser = new UsersModel({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            address: address,
            email: email
          })

          newUser.save().then((users) => {
            res.status(200).json({
              message: 'Successful created new user.',
              data: users
            })
          }).catch((err) => next(err))
        })
      })
    }
  }

  signIn(req, res) {
    const {
      username,
      password
    } = req.body

    UsersModel.findOne({
      username: username
    }).then((user) => {
      user.comparePassword(password, user.password, (err) => {
        if (err) next(err)

        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: '30m'
        })

        res.json({
          data: user,
          token: token
        })
      })
    }).catch((err) => next(err))
  }
}
module.exports = new PlacesController()