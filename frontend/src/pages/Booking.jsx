// src/pages/Booking.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/Button";
import { formatCurrency } from "../utils/formatCurrency";
import "./Booking.css";

export default function Booking() {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loadingTour, setLoadingTour] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Load tour details for price calculation
  useEffect(() => {
    async function fetchTour() {
      try {
        const { data } = await api.get(`/tours/${tourId}`);
        setTour(data.data);
        setLoadingTour(false);
      } catch (e) {
        setError("Tour not found");
        setLoadingTour(false);
      }
    }
    fetchTour();
  }, [tourId]);

  // Validation schema
  const schema = yup.object({
    fullName: yup.string().required("Full name required"),
    email: yup.string().email("Invalid email").required(),
    phone: yup.string().required("Phone required"),
    numberOfGuests: yup
      .number()
      .typeError("Must be a number")
      .min(1, "At least one guest")
      .required(),
    bookingDate: yup.string().required("Date required"),
    specialRequests: yup.string(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const numberOfGuests = watch("numberOfGuests") || 1;
  const totalPrice = tour?.price ? tour.price * numberOfGuests : 0;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const payload = {
        tourId,
        ...formData,
        totalPrice,
        status: "pending",
      };
      await api.post("/bookings", payload);
      alert("Booking confirmed! Check your email for details.");
      navigate("/tours");
    } catch (e) {
      alert("Failed to create booking. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingTour) return <div className="page-shell text-center"><p className="p-6">Loading tour…</p></div>;
  if (error) return <div className="page-shell text-center text-red-600"><p className="p-6">{error}</p></div>;

  return (
    <section className="booking-page">
      <div className="page-shell">
        <div className="booking-header">
          <span className="booking-kicker">Secure your spot</span>
          <h1>Book: {tour.title}</h1>
          <p>Complete the form below to finalize your adventure.</p>
        </div>

        <div className="booking-card">
          <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
            <div className="booking-row">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                placeholder="Enter your full name"
                {...register("fullName")}
                className="booking-input"
              />
              {errors.fullName && (
                <p className="booking-error">{errors.fullName.message}</p>
              )}
            </div>

            <div className="booking-row">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Email for confirmation"
                {...register("email")}
                className="booking-input"
              />
              {errors.email && (
                <p className="booking-error">{errors.email.message}</p>
              )}
            </div>

            <div className="booking-row">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                placeholder="Phone number"
                {...register("phone")}
                className="booking-input"
              />
              {errors.phone && (
                <p className="booking-error">{errors.phone.message}</p>
              )}
            </div>

            <div className="booking-row">
              <label htmlFor="numberOfGuests">Number of Guests</label>
              <input
                id="numberOfGuests"
                type="number"
                min={1}
                {...register("numberOfGuests")}
                className="booking-input"
              />
              {errors.numberOfGuests && (
                <p className="booking-error">{errors.numberOfGuests.message}</p>
              )}
            </div>

            <div className="booking-row">
              <label htmlFor="bookingDate">Travel Date</label>
              <input
                id="bookingDate"
                type="date"
                {...register("bookingDate")}
                className="booking-input"
              />
              {errors.bookingDate && (
                <p className="booking-error">{errors.bookingDate.message}</p>
              )}
            </div>

            <div className="booking-row">
              <label htmlFor="specialRequests">Special Requests</label>
              <textarea
                id="specialRequests"
                placeholder="Any special needs or preferences? (optional)"
                {...register("specialRequests")}
                className="booking-textarea"
              />
            </div>

            <div className="booking-total">
              Total Price: <span>{formatCurrency(totalPrice)}</span>
            </div>

            <div className="booking-submit">
              <Button variant="primary" type="submit" disabled={submitting} fullWidth>
                {submitting ? "Booking…" : "Confirm Booking"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
