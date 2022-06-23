import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function Navbar() {
  return (
    <div className="NavWrapper">
      <Link to="/" className="Link">
        Home
        <span role="img" aria-label="logo">
          🏡 🍿
        </span>
      </Link>
      <Link to="/movies/new" className="Link">
        + Add Movie
      </Link>
    </div>
  );
}
