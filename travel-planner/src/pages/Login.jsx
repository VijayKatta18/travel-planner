import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const { token, userId } = await login({email, password});
            console.log("Logged in user:", userId);
            console.log("Token:", token);
            navigate(redirectTo, { replace: true });
        }
        catch (err){
            console.error(err.message);            
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.5rem", maxWidth: 320 }}>
                <input
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}