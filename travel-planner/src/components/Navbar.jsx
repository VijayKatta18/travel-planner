import { Link } from "react-router-dom";
import "./Navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>Travel Planner</h2>
      <ul className="ul-list">
        <li><Link to="/" className="li-item">Home</Link></li>
        <li><Link to="/about" className="li-item">About</Link></li>
        <li><Link to="/trips" className="li-item">Trips</Link></li>
        <li><Link to="/login" className="li-item">Login</Link></li>
      </ul>
    </nav>
  );
}
