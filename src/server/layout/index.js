var path = require('path')
var resolve = path.resolve
var html = resolve(__dirname, 'template.jade')
var config = require('../config')

module.exports = (req, res) => {
  res.render(html, {
    appName: config.appName
  })
}

