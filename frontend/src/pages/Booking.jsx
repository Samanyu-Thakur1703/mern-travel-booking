// src/pages/Booking.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/Button";
import { formatCurrency } from "../utils/formatCurrency";

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
      .min(1, "At least one guest")
      .required(),
    bookingDate: yup.date().required("Date required"),
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
      // Simple success UI – you could show a modal
      alert("Booking confirmed! Check your email for details.");
      navigate("/tours");
    } catch (e) {
      alert("Failed to create booking. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingTour) return <p className="p-6 text-center">Loading tour…</p>;
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;

  return (
    <section className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Book: {tour.title}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          placeholder="Full Name"
          {...register("fullName")}
          className="border rounded p-2 w-full"
        />
        {errors.fullName && (
          <p className="text-red-600 text-sm">{errors.fullName.message}</p>
        )}

        <input
          placeholder="Email"
          type="email"
          {...register("email")}
          className="border rounded p-2 w-full"
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}

        <input
          placeholder="Phone"
          {...register("phone")}
          className="border rounded p-2 w-full"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm">{errors.phone.message}</p>
        )}

        <input
          placeholder="Number of Guests"
          type="number"
          min={1}
          {...register("numberOfGuests")}
          className="border rounded p-2 w-full"
        />
        {errors.numberOfGuests && (
          <p className="text-red-600 text-sm">{errors.numberOfGuests.message}</p>
        )}

        <input
          type="date"
          {...register("bookingDate")}
          className="border rounded p-2 w-full"
        />
        {errors.bookingDate && (
          <p className="text-red-600 text-sm">{errors.bookingDate.message}</p>
        )}

        <textarea
          placeholder="Special requests (optional)"
          rows={3}
          {...register("specialRequests")}
          className="border rounded p-2 w-full"
        />

        <p className="font-semibold">
          Total Price: <span className="text-primary-gradient">{formatCurrency(totalPrice)}</span>
        </p>

        <Button variant="primary" type="submit" disabled={submitting}>
          {submitting ? "Booking…" : "Confirm Booking"}
        </Button>
      </form>
    </section>
  );
}