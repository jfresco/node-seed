const debug = require('debug')
const pkg = require('../../../package.json')

module.exports = function (moduleName) {
  return debug(pkg.name + ':' + moduleName)
}

