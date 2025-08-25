import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";

export default function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from || "/";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username.trim()) return;
        dispatch(login(username.trim()));
        navigate(redirectTo, { replace: true });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.5rem", maxWidth: 320 }}>
                <input
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}