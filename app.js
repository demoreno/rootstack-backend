const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
let http = require('http')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const config = require('./config')

const app = express()

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

http.createServer(app).listen(config.ApiPort, function () {
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(allowCrossDomain);

  require('./routes')(app)

  console.log('Express server listening on port ' + config.ApiPort)
})

module.exports = app