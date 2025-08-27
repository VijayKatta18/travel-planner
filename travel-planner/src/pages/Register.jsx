import React, { useState } from 'react'
import "./Register.css";
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { useDispatch } from 'react-redux';

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const {token, userId} = await register({firstName, lastName, email, password});
           //dispatch(registerSuccess({token, userId}));
           navigate("/login", { replace: true });
        }
        catch (err) {
            console.error(err.message);
        }

    }

    return (
        <div className="login-background">
            <div className="login-card">
                <h1 className="login-title">Register</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <input
                            className="login-input"
                            type="text"
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            className="login-input"
                            type="text"
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            className="login-input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            className="login-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Register</button>
                    <div className="signup-link">
                        Member? <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
