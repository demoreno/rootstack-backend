const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
let http = require('http')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const config = require('./config')

const app = express()

http.createServer(app).listen(config.ApiPort, function () {
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, 'public')))
  app.use((err, req, res, next) => {
    res.status(400).json({
      message: err,
      data: []
    })
  })

  require('./routes')(app)

  console.log('Express server listening on port ' + config.ApiPort)
})

module.exports = app