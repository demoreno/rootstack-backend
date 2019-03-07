const jwt = require('jsonwebtoken')
const moment = require('moment')
const config = require('../config')

exports.verifyAuth = function (req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({
        message: 'Your request doesnt have token'
      })
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret)

    if (payload && payload.exp <= moment().unix()) {
      return res
        .status(401)
        .send({
          message: 'Token has expired'
        })
    }

    req.user = payload.sub
    next()
  } catch (error) {
    return res
      .status(401)
      .send({
        message: 'Token not found'
      })
  }
}
