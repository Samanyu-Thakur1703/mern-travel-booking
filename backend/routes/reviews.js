// backend/routes/reviews.js
const express = require('express');
const router = express.Router();
const {
  getTourReviews,
  createReview,
  deleteReview
} = require('../controllers/reviewController');

router.get('/:tourId', getTourReviews);
router.post('/', createReview);
router.delete('/:id', deleteReview);

module.exports = router;