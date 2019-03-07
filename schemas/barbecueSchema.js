const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BarbecueSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String,
  },
  model: {
    type: String,
    required: true
  },
  description: {
    type: Date,
    default: Date.now
  },
  coordinates: {
    type: [Number],
  },
  booking: [{
    initDate: {
      type: Date,
    },
    finishDate: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    }
  }],
})

module.exports = BarbecueSchema