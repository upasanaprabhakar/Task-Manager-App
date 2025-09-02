import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showSuccess, showWarning } from "../components/ToastProvider";
import logo from "../assets/logo.svg";
import "./Navbar.css";

function Navbar() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "");
  }, []);

  const handleLogout = () => {
    showWarning(
      <div>
        <div>Are you sure you want to logout?</div>
        <div className="toast-confirm-buttons">
          <button
            className="toast-confirm-button yes"
            onClick={() => {
              localStorage.removeItem("username");
              setUsername("");
              toast.dismiss();
              showSuccess("Logged out successfully!");
              navigate("/auth");
            }}
          >
            Yes
          </button>
          <button
            className="toast-confirm-button no"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false, closeButton: false, draggable: false }
    );
  };

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="TaskMaster Logo" className="logo-img" />
      </div>
      <nav className="navbar__links">
        <NavLink to="/tasklist" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} end>
          My Tasks
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Projects
        </NavLink>
        {username ? (
          <button className="nav-link logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Login / Register
          </NavLink>
        )}
      </nav>
      <div className="navbar__profile">
        <span className="welcome-text">
          Welcome, {username ? username : "Guest"}
        </span>
      </div>
    </header>
  );
}

export default Navbar;
