// backend/controllers/reviewController.js
const Review = require('../models/Review');
const Tour = require('../models/Tour');

// Get reviews for a tour
exports.getTourReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ tourId: req.params.tourId });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create review
exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    // Update tour rating
    const reviews = await Review.find({ tourId: req.body.tourId });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await Tour.findByIdAndUpdate(req.body.tourId, { rating: avgRating.toFixed(1) });

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: review
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add review',
      error: error.message
    });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};