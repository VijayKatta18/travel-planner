import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import "./Login.css";
import { FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token, userId } = await login({ email, password });
      // redux "pass info to store using defined function in store"
      dispatch(loginSuccess({ token, userId, rememberMe }));
      toast.success("🎉 Login successful!",{
        position: "top-center",
        autoClose: 2000
      })

      setTimeout(() => {
        navigate(redirectTo, { replace: true });
      }, 2100);
      
    }
    catch (err) {
      console.error(err.message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <h1 className="login-title">LOGIN</h1>
        <form onSubmit={handleSubmit} className="login-form">
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
          <div className="remember-group">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <FaSpinner className="spinner" />
            ) : (
              "LOGIN"
            )}
          </button>
        </form>
        <div className="login-or">
          <span>Or login with</span>
        </div>
        <div className="third-party-login">
          <button className="login-social facebook">
            <i className="fab fa-facebook-f"></i> Facebook
          </button>
          <button className="login-social google">
            <i className="fab fa-google"></i> Google
          </button>
        </div>
        <div className="signup-link">
          Not a member? <Link to="/register">Register</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}