// backend/routes/tours.js
const express = require('express');
const router = express.Router();
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getFeaturedTours
} = require('../controllers/tourController');

router.get('/', getAllTours);
router.get('/featured', getFeaturedTours);
router.get('/:id', getTour);
router.post('/', createTour);
router.put('/:id', updateTour);
router.delete('/:id', deleteTour);

module.exports = router;