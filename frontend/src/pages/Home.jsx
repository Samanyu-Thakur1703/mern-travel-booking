import { useNavigate } from "react-router-dom";
import { useTours } from "../hooks/useTours";
import Card from "../components/Card";
import Button from "../components/Button";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { tours = [], isLoading } = useTours();

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="page-shell home-hero-content">
          <span className="home-badge">Dream • Explore • Book</span>
          <h1>Explore the World with TravelBook</h1>
          <p>
            Curated tours, vibrant destinations, and smooth booking in one place.
          </p>
          <Button variant="primary" onClick={() => navigate("/tours")}>
            Browse Tours
          </Button>
        </div>
      </section>

      <section className="home-featured">
        <div className="page-shell">
          <div className="section-head">
            <span>Handpicked trips</span>
            <h2>Featured Tours</h2>
          </div>

          {isLoading ? (
            <p className="section-message">Loading tours...</p>
          ) : (
            <div className="tour-grid">
              {tours.slice(0, 6).map((tour) => (
                <Card key={tour._id} tour={tour} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}