import React, { useState } from 'react'
import "./Register.css";
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
           const {token, userId} = await register({firstName, lastName, email, password});
           
           // show success popup
           toast.success("🎉 Registration successful! Please login.", {
             position: "top-center",
             autoClose: 2000
           });

           // redirect after a short delay
           setTimeout(() => {
             navigate("/login", { replace: true });
           }, 2100);
        }
        catch (err) {
            console.error(err.message);
            toast.error("❌ Registration failed! Try again.", {
              position: "top-center",
            });
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div className="login-background">
            <div className="login-card">
                <h1 className="login-title">REGISTER</h1>
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
                    <button type="submit" className="login-btn">
                       {loading ? ( <FaSpinner className="spinner" /> ) : ( "Register" ) }  
                    </button>
                    <div className="signup-link">
                        Member? <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}
