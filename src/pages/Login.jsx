import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showWarning, showSuccess } from "../components/ToastProvider";
import "./Auth.css";

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!form.username || !form.password) {
            showWarning("Please fill in all fields.");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: form.username,
                    password: form.password,
                }),
            });

            const data = await res.json(); // ✅ always JSON now

            if (!res.ok) {
                showWarning(data.message || "Login failed.");
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.user.username);

            // 👇 fire event so Navbar knows immediately
            window.dispatchEvent(new Event("storage"));

            showSuccess(`Welcome back, ${data.user.username}`);
            navigate("/tasklist");
        } catch (err) {
            console.error("Error during login:", err);
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
                <h2>Login to Your Account</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="username"
                        name="username"
                        placeholder="Username"
                        value={form.username}
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
                    <button type="submit" className="auth-btn" style={{ marginTop: "1.5rem" }}>
                        Login
                    </button>
                </form>
                <p className="auth-switch-text">
                    Don’t have an account?{" "}
                    <Link to="/register" className="auth-switch-link">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
