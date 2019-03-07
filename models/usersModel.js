const db = require('../models')
const bcrypt = require('bcrypt-nodejs')
const UsersSchema = require('../schemas/usersSchema')

UsersSchema.methods.comparePassword = (passw, passWDb, cb) => {
  bcrypt.compare(passw, passWDb, (err, isMatch) => {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}
const UsersModel = db.model('Users', UsersSchema)

module.exports = UsersModel
