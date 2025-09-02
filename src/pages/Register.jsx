import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showWarning, showSuccess } from "../components/ToastProvider";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      showWarning("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      showWarning("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        showWarning(errorData.message || "Registration failed.");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      showSuccess(`Welcome, ${form.name}`);
      navigate("/");
    } catch (err) {
      console.error("Error during registration:", err);
      showWarning("Something went wrong.");
    }
  };

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
        <h2>Register New Account</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
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
              onKeyDown={(e) => {
                if (e.key === "Enter") setShowPassword(!showPassword);
              }}
            >
              <EyeIcon visible={showPassword} />
            </div>
          </div>
          <div style={{ position: "relative", width: "100%", marginTop: "1rem" }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
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
              onKeyDown={(e) => {
                if (e.key === "Enter") setShowConfirmPassword(!showConfirmPassword);
              }}
            >
              <EyeIcon visible={showConfirmPassword} />
            </div>
          </div>
          <button type="submit" className="auth-btn" style={{ marginTop: "1.5rem" }}>
            Register
          </button>
        </form>
        <p className="auth-switch-text">
          Already have an account?{" "}
          <Link to="/" className="auth-switch-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
