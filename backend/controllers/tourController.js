// backend/controllers/tourController.js
const Tour = require('../models/Tour');

// Get all tours with filtering and sorting
exports.getAllTours = async (req, res) => {
  try {
    const { category, search, sortBy } = req.query;
    let query = {};

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search by title or location
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    let tours = Tour.find(query);

    // Sorting
    if (sortBy === 'price-low') {
      tours = tours.sort({ price: 1 });
    } else if (sortBy === 'price-high') {
      tours = tours.sort({ price: -1 });
    } else if (sortBy === 'rating') {
      tours = tours.sort({ rating: -1 });
    }

    const result = await tours;

    res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single tour
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.status(200).json({
      success: true,
      data: tour
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create tour
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);

    res.status(201).json({
      success: true,
      data: tour
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create tour',
      error: error.message
    });
  }
};

// Update tour
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.status(200).json({
      success: true,
      data: tour
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update tour',
      error: error.message
    });
  }
};

// Delete tour
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tour deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get featured tours
exports.getFeaturedTours = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true }).limit(6);

    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};