import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showSuccess, showInfo, showWarning } from "../components/ToastProvider";
import "./Auth.css";

function Auth({ mode }) {
  const isLogin = mode === "login";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!form.email || !form.password || (!isLogin && !form.name)) {
      showWarning("Please fill in all required fields.");
      return;
    }

    if (!isLogin && form.password !== form.confirmPassword) {
      showWarning("Passwords do not match.");
      return;
    }

    if (isLogin) {
      // Hardcoded login check for example
      if (form.email === "test@example.com" && form.password === "password123") {
        localStorage.setItem("username", "Test User");
        showSuccess(`Welcome back, Test User!`);
        navigate("/tasklist");
      } else {
        showWarning("Invalid email or password.");
      }
    } else {
      // Registration: auto-login after register
      localStorage.setItem("username", form.name);
      showSuccess(`Registration successful! Welcome, ${form.name}!`);
      navigate("/"); // Redirect to main dashboard or homepage after registration
    }
  };
  const handleauth = async()=>{
    if(isLogin==="login"){
      await handleLogin();
    }else await handleRegister();
  }
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Login failed:", errorData);
        return;
      }

      const data = await res.json();
      console.log("Login successful, token:", data.token);
      navigate("/tasklist");
      // Optionally save token for later use
      localStorage.setItem("token", data.token);
    } catch (err) {
      console.error("Error during login:", err);
    }
  
};
const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Login failed:", errorData);
        return;
      }

      const data = await res.json();
      navigate("/tasklist");
      console.log("upasana");
      // Optionally save token for later use
      localStorage.setItem("token", data.token);
    } catch (err) {
      console.error("Error during login:", err);
    }
    }


  const EyeIcon = ({ visible }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      style={{ cursor: "pointer" }}
    >
      {visible ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8" />
          <path d="M1 1l22 22" />
        </>
      )}
    </svg>
  );

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login to Your Account" : "Register New Account"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
          />
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              minLength={6}
              value={form.password}
              onChange={handleChange}
              style={{ paddingRight: "35px", width: "100%" }}
            />
            <div
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--secondary)",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") setShowPassword(!showPassword) }}
            >
              <EyeIcon visible={showPassword} />
            </div>
          </div>
          {!isLogin && (
            <div style={{ position: "relative", width: "100%", marginTop: "1rem" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                minLength={6}
                value={form.confirmPassword}
                onChange={handleChange}
                style={{ paddingRight: "35px", width: "100%" }}
              />
              <div
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--secondary)",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") setShowConfirmPassword(!showConfirmPassword) }}
              >
                <EyeIcon visible={showConfirmPassword} />
              </div>
            </div>
          )}
          <button type="submit" className="auth-btn" onClick={handleauth} style={{ marginTop: "1.5rem" }}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        {isLogin ? (
          <p className="auth-switch-text">
            Don’t have an account?{" "}
            <Link to="/auth/register" className="auth-switch-link">
              Register
            </Link>
          </p>
        ) : (
          <p className="auth-switch-text">
            Already have an account?{" "}
            <Link to="/" className="auth-switch-link">
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Auth;
