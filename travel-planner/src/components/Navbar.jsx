import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div>
        <h2>Travel Planner</h2>
        <ul className="ul-list">
          <li>
            <Link to="/" className="li-item">Home</Link>
          </li>

          {isLoggedIn && (
            <>
              <li>
                <Link to="/about" className="li-item">About</Link>
              </li>
              <li>
                <Link to="/trips" className="li-item">Trips</Link>
              </li>
            </>
          )}

          {!isLoggedIn && (
            <li>
              <Link to="/login" className="li-item">Login</Link>
            </li>
          )}
        </ul>
      </div>

      <div>
        {isLoggedIn ? (
          <>
            <span>Hi, {user.username}</span>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </nav>
  );
}
