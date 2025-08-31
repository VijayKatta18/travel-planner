import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { googleLogin, login } from "../services/authService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import "./Login.css";
import { FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google"; // ✅ NEW: import Google login button

// Login Reponse type 
interface LoginResponse {
  token: string;
  userId: string;
}

// Define what comes from location.state
interface LocationState {
  from?: string;
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const redirectTo = (location.state as LocationState)?.from || "/";

  // ----------------------
  // Existing Email/Password Login
  // ----------------------
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token, userId }: LoginResponse = await login({ email, password });
      dispatch(loginSuccess({ token, userId, rememberMe }));
      toast.success("🎉 Login successful!", {
        position: "top-center",
        autoClose: 2000
      });

      setTimeout(() => {
        navigate(redirectTo, { replace: true });
      }, 2100);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        toast.error("❌ Login failed: " + err.message);
      }
    }
    finally {
      setLoading(false);
    }
  };

  // ----------------------
  // ✅ NEW: Google Login Handler
  // ----------------------
  const handleGoogleLogin = async (credential: string) => {
    try {
      const { token, userId }: LoginResponse = await googleLogin(credential);
      dispatch(loginSuccess({ token, userId, rememberMe: true }));
      toast.success("🎉 Google Login successful!", {
        position: "top-center",
        autoClose: 2000
      });

      setTimeout(() => {
        navigate(redirectTo, { replace: true });
      }, 2100);
    } catch (error: any) {
      console.error(error);
      toast.error("❌ Google Login failed");
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="remember-group">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
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

          {/* ✅ NEW: Google Login Button */}
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                handleGoogleLogin(credentialResponse.credential);
              } else {
                toast.error("❌ No Google credential received", {
                  position: "top-center",
                  autoClose: 2000
                });
              }
            }}
            onError={() => {
              toast.error("❌ Google Login failed", {
                position: "top-center",
                autoClose: 2000
              });
            }}
          />
        </div>
        <div className="signup-link">
          Not a member? <Link to="/register">Register</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}