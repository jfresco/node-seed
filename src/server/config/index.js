const env = process.env
const pkg = require('../../../package.json')

module.exports = {
  appName: env.APP_NAME || pkg.name,
  db: env.MONGO_URL || 'mongodb://localhost/shawarmap-dev',
  port: env.PORT || 3000
}

