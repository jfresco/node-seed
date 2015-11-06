var LandingView = require('../views/landing')
var models = require('../models')
var Store = models.Store

module.exports.landing = function landingController () {
  Store.fetch().then(function (stores) {
    var view = new LandingView(stores)
    var container = document.querySelector('.content')
    view.replace(container)
  })
}

