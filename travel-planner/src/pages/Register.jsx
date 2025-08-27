import React, { useReducer, useState } from 'react'
import "./Register.css";
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    loading: false,
    error: null,
};

function reducer(state, action){
    switch(action.type){
        case "FIELD":
            return {
                ...state,
                [action.payload.field]: action.payload.value,
            };
        case "SUBMIT_START":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "SUBMIT_SUCCESS":
            return{
                ...state,
                loading: false,
                error: null,
            };
        case "SUBMIT_FAILURE":
            return{
                ...state,
                loading: false,
                error: action.payload?.error || "Something error",
            };
        case "RESET":
            return initialState;
        default:
            state;
    }
    
}


export default function Register() {
    const [state, localDisptach] = useReducer(reducer, initialState);
    const { firstName, lastName, email, password, loading } = state;
    const navigate = useNavigate();

    const handleChange = (field) => (e) => {
        localDisptach({ type: "FIELD", payload: { field, value: e.target.value}})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        localDisptach({type: "SUBMIT_START"});
        try {
            await register({firstName, lastName, email, password});

            localDisptach({type: "SUBMIT_SUCCESS"});
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
            localDisptach({type: "SUBMIT_FAILURE", payload: { error: err.message}});
            toast.error("❌ Registration failed! Try again.", {
              position: "top-center",
            });
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
                            onChange={handleChange("firstName")}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            className="login-input"
                            type="text"
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={handleChange("lastName")}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            className="login-input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange("email")}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            className="login-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange("password")}
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
