import { Link } from "react-router-dom";
import { FaHome, FaInfoCircle, FaPlane, FaUser, FaSignInAlt, FaBars, FaUsers } from "react-icons/fa";
import "./Sidebar.css";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function Sidebar({ isOpen, setIsOpen }) {
    const toggleSidebar = () => setIsOpen(!isOpen);
    const dispatch = useDispatch();

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
                    <Link to="/profile">
                        <FaUser className="icon" />
                        {isOpen && <span>Profile</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/users">
                        <FaUsers className="icon" />
                        {isOpen && <span>Users</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/login" onClick={() => dispatch(logout())}>
                        <FaSignInAlt className="icon" />
                        {isOpen && <span>Logout</span>}
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
