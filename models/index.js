const config = require('../config')
const mongoose = require('mongoose')

mongoose.connect('mongodb://' + config.dataBase.server + config.dataBase.name, {
  useNewUrlParser: true
})

var connection = mongoose.connection
connection.on('error', console.error.bind(console, 'connection error:'))
connection.once('open', function () {
  console.log('MongoDB connection start')
})

module.exports = connection
