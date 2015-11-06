var inherits = require('inherits')
var events = require('events')
var EventEmitter = events.EventEmitter
var superagent = require('superagent')

function StoreModel () {
}

inherits(StoreModel, EventEmitter)

StoreModel.prototype.fetch = function () {
  var self = this
  return new Promise(function (resolve, reject) {
    if (this.stores) {
      resolve(this.stores)
    } else {
      self.update()
        .then(function () { resolve(self.stores) })
        .catch(function (err) { reject(err) })
    }
  })
}

StoreModel.prototype.update = function () {
  return new Promise(function (resolve, reject) {
    superagent
      .get('/api/stores')
      .end(function (err, res) {
        if (err) {
          reject(err)
        } else {
          this.stores = res.body
          this.emit('update')
          resolve()
        }
      })
  })
}

module.exports.Store = new StoreModel()

