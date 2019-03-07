var fs = require('fs')
var path = require('path')

module.exports = (app) => {
  fs
    .readdirSync(__dirname)
    .filter(function (file) {
      return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function (file) {
      var route = require('./' + file)
      var nameRoute = path.basename(file, '.js')
      app.use('/' + nameRoute, route)
    })
}
