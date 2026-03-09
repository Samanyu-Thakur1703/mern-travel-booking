// backend/models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);