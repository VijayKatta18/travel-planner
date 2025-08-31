import React, { ChangeEvent, FormEvent, useReducer } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

// 🔹 Define state shape
interface State {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
}

// 🔹 Initial state
const initialState: State = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  loading: false,
  error: null,
};

// 🔹 Action types
type Action =
  | { type: "FIELD"; payload: { field: keyof State; value: string } }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_FAILURE"; payload: { error: string } }
  | { type: "RESET" };

// 🔹 Reducer function
function reducer(state: State, action: Action): State {
  switch (action.type) {
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
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "SUBMIT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function Register() {
  const [state, localDispatch] = useReducer(reducer, initialState);
  const { firstName, lastName, email, password, loading } = state;
  const navigate = useNavigate();

  const handleChange =
    (field: keyof State) => (e: ChangeEvent<HTMLInputElement>) => {
      localDispatch({
        type: "FIELD",
        payload: { field, value: e.target.value },
      });
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localDispatch({ type: "SUBMIT_START" });

    try {
      await register({ firstName, lastName, email, password });

      localDispatch({ type: "SUBMIT_SUCCESS" });

      toast.success("🎉 Registration successful! Please login.", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2100);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        localDispatch({
          type: "SUBMIT_FAILURE",
          payload: { error: err.message },
        });

        toast.error("❌ Registration failed! Try again.", {
          position: "top-center",
        });
      }
    }
  };

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
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <FaSpinner className="spinner" /> : "Register"}
          </button>
          <div className="signup-link">
            Member? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
