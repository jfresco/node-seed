var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId

var PlaceSchema = mongoose.Schema({
  address: { type: String },
  position: {
    lat: { type: Number },
    lng: { type: Number }
  }
})

module.exports.Place = mongoose.model('Place', PlaceSchema)

var StoreSchema = mongoose.Schema({
  name: { type: String, required: true },
  places: { type: [PlaceSchema] }
})

module.exports.Store = mongoose.model('Store', StoreSchema)

var UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  displayName: { type: String },
  avatar: { type: String },
  active: { type: Boolean, default: false }
})

module.exports.User = mongoose.model('User', UserSchema)

var ReviewSchema = mongoose.Schema({
  store: { type: ObjectId, ref: 'Store', required: true },
  user: { type: ObjectId, ref: 'User', required: true },
  score: { type: Number, min: 1, max: 5, required: true },
  comments: { type: String, required: true }
})

module.exports.Review = mongoose.model('Review', ReviewSchema)
