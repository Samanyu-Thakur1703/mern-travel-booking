import { useState } from "react";
import { useTours } from "../hooks/useTours";
import Card from "../components/Card";
import "./Tours.css";

export default function Tours() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("");

  const { tours, isLoading, isError } = useTours({
    search,
    category,
    sortBy,
  });

  return (
    <section className="tours-page">
      <div className="page-shell">
        <div className="tours-header">
          <span className="tours-kicker">Browse destinations</span>
          <h1>All Tours</h1>
          <p>Choose the perfect escape from our curated collection.</p>
        </div>

        <div className="tours-filters">
          <input
            type="text"
            placeholder="Search by title or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="tours-input"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="tours-select"
          >
            <option value="all">All Categories</option>
            <option value="Beach">Beach</option>
            <option value="Mountain">Mountain</option>
            <option value="City">City</option>
            <option value="Cultural">Cultural</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="tours-select"
          >
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {isLoading ? (
          <p className="tours-message">Loading tours...</p>
        ) : isError ? (
          <p className="tours-message error">Failed to load tours.</p>
        ) : tours.length === 0 ? (
          <p className="tours-message">No tours found.</p>
        ) : (
          <div className="tours-grid">
            {tours.map((tour) => (
              <Card key={tour._id} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}