import { Link } from "react-router-dom";
import { FaHome, FaInfoCircle, FaPlane, FaUser, FaSignInAlt, FaBars } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar({ isOpen, setIsOpen }) {
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <div className="top-section">
                <button className="toggle-btn" onClick={toggleSidebar}>
                    <FaBars />
                </button>
            </div>

            <ul className="sidebar-list">
                <li>
                    <Link to="/">
                        <FaHome className="icon" />
                        {isOpen && <span>Home</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/about">
                        <FaInfoCircle className="icon" />
                        {isOpen && <span>About</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/trips">
                        <FaPlane className="icon" />
                        {isOpen && <span>Trips</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/login">
                        <FaSignInAlt className="icon" />
                        {isOpen && <span>Login</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <FaUser className="icon" />
                        {isOpen && <span>Profile</span>}
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
