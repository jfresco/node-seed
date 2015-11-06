var template = require('./template.jade')

function LandingView () {
  this.html = template()
}

LandingView.prototype.replace = function (el) {
  el.innerHTML = this.html
}

module.exports = LandingView

