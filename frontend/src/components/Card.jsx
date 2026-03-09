import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ tour }) {
  if (!tour?._id) return null;

  const rawImage = Array.isArray(tour.images) ? tour.images[0] : tour.images;
  const imageUrl =
    typeof rawImage === "string" && rawImage.trim()
      ? rawImage.trim()
      : "";

  return (
    <Link to={`/tours/${tour._id}`} className="card">
      <div
        className="card-image"
        style={
          imageUrl
            ? { backgroundImage: `url("${imageUrl}")` }
            : {}
        }
      />

      <div className="card-content">
        <h3 className="card-title">{tour.title}</h3>
        <p className="card-location">{tour.location}</p>
        <p className="card-price">${tour.price}</p>
      </div>
    </Link>
  );
}