// backend/models/Tour.js
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  duration: {
    type: Number,
    required: true
  },
  maxGroupSize: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Beach', 'Mountain', 'City', 'Cultural'],
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  images: [{
    type: String
  }],
  included: [{
    type: String
  }],
  itinerary: [{
    day: Number,
    title: String,
    description: String
  }],
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tour', tourSchema);