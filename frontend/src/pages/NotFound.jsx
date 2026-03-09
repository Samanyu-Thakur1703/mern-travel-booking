// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Oops! The page you are looking for does not exist.</p>
      <Button variant="primary" as={Link} to="/">
        Go Home
      </Button>
    </section>
  );
}