import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Button from "../components/Button";
import "./TourDetail.css";

export default function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTour() {
      try {
        const { data } = await api.get(`/tours/${id}`);
        setTour(data.data);
        setActiveImage(0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTour();
  }, [id]);

  if (loading) return <p className="tour-detail-message">Loading...</p>;
  if (!tour) return <p className="tour-detail-message">Tour not found.</p>;

  const images = Array.isArray(tour.images) ? tour.images : [];
  const currentImage = images[activeImage] || "/placeholder.jpg";

  return (
    <section className="tour-detail-page">
      <div className="page-shell">
        <div className="tour-detail-layout">
          <div className="tour-gallery">
            <div className="tour-main-image-wrap">
              <img
                src={currentImage}
                alt={tour.title}
                className="tour-main-image"
              />
            </div>

            <div className="tour-thumbs">
              {images.map((img, index) => (
                <button
                  key={index}
                  className={`tour-thumb ${activeImage === index ? "active" : ""}`}
                  onClick={() => setActiveImage(index)}
                  type="button"
                >
                  <img src={img} alt={`${tour.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="tour-info-card">
            <span className="tour-category-badge">{tour.category}</span>
            <h1>{tour.title}</h1>
            <p className="tour-description">{tour.description}</p>

            <div className="tour-meta">
              <div><strong>Location:</strong> {tour.location}</div>
              <div><strong>Duration:</strong> {tour.duration} days</div>
              <div><strong>Group Size:</strong> {tour.maxGroupSize}</div>
              <div><strong>Rating:</strong> ⭐ {tour.rating}</div>
            </div>

            <div className="tour-price-row">
              <span className="tour-price">${tour.price}</span>
              <span className="tour-price-note">per person</span>
            </div>

            <Button
              variant="primary"
              onClick={() => navigate(`/booking/${tour._id}`)}
            >
              Book Now
            </Button>
          </div>
        </div>

        {tour.included?.length > 0 && (
          <div className="tour-detail-block">
            <h2>What’s Included</h2>
            <div className="tour-tags">
              {tour.included.map((item, index) => (
                <span key={index} className="tour-tag">{item}</span>
              ))}
            </div>
          </div>
        )}

        {tour.itinerary?.length > 0 && (
          <div className="tour-detail-block">
            <h2>Itinerary</h2>
            <div className="itinerary-list">
              {tour.itinerary.map((item) => (
                <div key={item.day} className="itinerary-item">
                  <div className="itinerary-day">Day {item.day}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}