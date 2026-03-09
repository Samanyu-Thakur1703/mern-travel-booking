// backend/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  numberOfGuests: {
    type: Number,
    required: true,
    min: 1
  },
  bookingDate: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  specialRequests: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);