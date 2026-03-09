import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="logo-travel">Travel</span>
        <span className="logo-book">Book</span>
      </Link>

      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Home
        </NavLink>
        <NavLink to="/tours" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Tours
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Contact
        </NavLink>

        <button className="theme-toggle" onClick={toggleDarkMode} type="button">
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}