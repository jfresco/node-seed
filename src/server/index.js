const config = require('./config')
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const models = require('./models')
const User = models.User
const log = require('./log')('server')

mongoose.connect(config.db)

app.use(express.static('dist'))
app.use(cookieParser())
app.use(bodyParser())
app.use(passport.initialize())

passport.use(new LocalStrategy(function (username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      return done(err)
    } else if (!user) {
      return done(null, false, { message: 'Incorrect username' })
    } else if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorret password' })
    }
    return done(null, user)
  })
}))

app.get('/', require('../server/layout'))

app.get('/api/stores', function (req, res) {
  log('GET /api/stores')
  return models.Store.find((err, stores) => {
    if (err) {
      log('Error: %s', err)
      return res.send(err).status(500)
    }
    log('Deliverying stores: %j', stores)
    res.send(stores)
  })
})

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: false }))

app.listen(config.port, () => {
  log('App started')
})

