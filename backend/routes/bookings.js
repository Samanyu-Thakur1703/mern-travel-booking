// backend/routes/bookings.js
const express = require('express');
const router = express.Router();
const {
  getAllBookings,
  getBooking,
  createBooking,
  deleteBooking
} = require('../controllers/bookingController');

router.get('/', getAllBookings);
router.get('/:id', getBooking);
router.post('/', createBooking);
router.delete('/:id', deleteBooking);

module.exports = router;