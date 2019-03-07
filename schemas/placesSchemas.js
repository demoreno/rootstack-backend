const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlacesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  comments: [{
    body: String,
    date: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    }
  }],
  date: {
    type: Date,
    default: Date.now
  },
  coordinates: {
    type: [Number],
    required: true
  }
})

module.exports = PlacesSchema
