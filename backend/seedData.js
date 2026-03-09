require("dotenv").config();
const mongoose = require("mongoose");
const Tour = require("./models/Tour");

const tours = [
  {
    title: "Romantic Paris Getaway",
    description: "Experience the charm of Paris with iconic landmarks, cafés, and unforgettable city views.",
    price: 1299,
    duration: 5,
    maxGroupSize: 10,
    location: "Paris, France",
    category: "City",
    rating: 4.8,
    featured: true,
    images: [
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=1200&q=80"
],
    included: ["Hotel", "Breakfast", "City Tour"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Check in and relax." },
      { day: 2, title: "City Tour", description: "Explore famous landmarks." }
    ]
  },
  {
    title: "Bali Paradise Escape",
    description: "Relax on beautiful beaches and enjoy the tropical atmosphere of Bali.",
    price: 899,
    duration: 6,
    maxGroupSize: 12,
    location: "Bali, Indonesia",
    category: "Beach",
    rating: 4.7,
    featured: true,
    images: [
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1200&q=80"
],
    included: ["Resort Stay", "Breakfast", "Airport Pickup"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Welcome to Bali." },
      { day: 2, title: "Beach Day", description: "Enjoy the sea and sun." }
    ]
  },
  {
    title: "Tokyo Adventure",
    description: "Discover modern city life, culture, and amazing food in Tokyo.",
    price: 1599,
    duration: 7,
    maxGroupSize: 15,
    location: "Tokyo, Japan",
    category: "City",
    rating: 4.9,
    featured: true,
    images: [
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80"
],
    included: ["Hotel", "Metro Pass", "Guided Tour"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Hotel check-in." },
      { day: 2, title: "Tokyo Tour", description: "Visit top attractions." }
    ]
  },
  {
    title: "Santorini Dream",
    description: "Enjoy white villages, blue domes, and amazing sunsets in Santorini.",
    price: 1199,
    duration: 5,
    maxGroupSize: 8,
    location: "Santorini, Greece",
    category: "Beach",
    rating: 4.8,
    featured: true,
    images: [
  "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80"
],
    included: ["Hotel", "Breakfast", "Island Tour"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Welcome to Santorini." },
      { day: 2, title: "Sunset Tour", description: "Watch the famous sunset." }
    ]
  },
  {
    title: "Swiss Alps Adventure",
    description: "Explore breathtaking mountain landscapes and fresh alpine air.",
    price: 1799,
    duration: 8,
    maxGroupSize: 10,
    location: "Swiss Alps, Switzerland",
    category: "Mountain",
    rating: 4.9,
    featured: true,
    images: [
  "https://images.unsplash.com/photo-1523905039634-7b3d26b841ea?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1496401677183-2b08d038e48b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1560259979-16c4c79ce339?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
],
    included: ["Lodge", "Meals", "Guide"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Mountain lodge check-in." },
      { day: 2, title: "Hiking", description: "Explore alpine trails." }
    ]
  },
  {
    title: "Machu Picchu Heritage Tour",
    description: "Discover the beauty and history of Machu Picchu.",
    price: 1499,
    duration: 6,
    maxGroupSize: 14,
    location: "Cusco, Peru",
    category: "Cultural",
    rating: 4.8,
    featured: true,
    images: [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80"
],
    included: ["Hotel", "Transport", "Guide"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Arrive in Cusco." },
      { day: 2, title: "Historic Tour", description: "Visit key heritage sites." }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    await Tour.deleteMany();
    console.log("Old tours deleted");

    await Tour.insertMany(tours);
    console.log("New tours added");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();