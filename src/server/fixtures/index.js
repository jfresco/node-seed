var mongoose = require('mongoose')
var config = require('../config')
var models = require('../models')
var stores = require('./stores.json')

mongoose.connect(config.db)

var Store = models.Store
var count = stores.length
stores.forEach(store => {
  Store.create(store, err => {
    if (err) {
      console.log(err)
    }

    if (--count === 0) {
      mongoose.disconnect(() => process.exit(0))
    }
  })
})
