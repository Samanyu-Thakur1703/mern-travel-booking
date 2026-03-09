const express = require("express");
const cors = require("cors");
const path = require("path");

const tourRoutes = require("./routes/tours");
const bookingRoutes = require("./routes/bookings");
const reviewRoutes = require("./routes/reviews");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Travel Booking API" });
});

app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);

module.exports = app;