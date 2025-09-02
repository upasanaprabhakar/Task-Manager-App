import React, { useState, useRef, useEffect } from "react";
import "./Projects.css";
import SearchBar from "../components/SearchBar";
import Lottie from "lottie-react";
import plusAnimation from "../assets/plus.json";
import { showSuccess, showInfo, showWarning } from "../components/ToastProvider";
import { toast } from "react-toastify";
import NoProjectsImage from "../assets/No_Projects.png";


function Projects() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", due: "", status: "Pending" });
  const [editId, setEditId] = useState(null);
  const [modalDropdownOpen, setModalDropdownOpen] = useState(false);
  const modalDropdownRef = useRef(null);
  const statusOptions = ["Pending", "Ongoing", "Completed"];

  // Fetch projects with token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/projects", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProjects(data || []))
      .catch(() => showWarning("Failed to load projects"));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalDropdownRef.current && !modalDropdownRef.current.contains(e.target)) {
        setModalDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getProgressFromStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return 100;
      case "ongoing":
        return 50;
      default:
        return 10;
    }
  };

  const getProgressBarColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "#137b47";
      case "ongoing":
        return "#853dd9";
      default:
        return "#d43d3d";
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "All" || project.status === filter)
  );

  const handleAddOrEditProject = () => {
    if (!newProject.name.trim() || !newProject.due) {
      showWarning("Please provide a name and due date.");
      return;
    }

    const token = localStorage.getItem("token");
    const url = editId
      ? `http://localhost:5000/api/projects/${editId}`
      : "http://localhost:5000/api/projects";
    const method = editId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(newProject),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editId) {
          setProjects(projects.map((p) => (p._id === editId ? data : p)));
          showInfo("Project updated successfully!");
        } else {
          setProjects([...projects, data]);
          showSuccess("Project added successfully!");
        }
        setShowAddProject(false);
        setEditId(null);
        setNewProject({ name: "", due: "", status: "Pending" });
        setModalDropdownOpen(false);
      })
      .catch(() => showWarning("Failed to save project"));
  };

  const handleEdit = (id) => {
    const project = projects.find((p) => p._id === id);
    if (project) {
      setNewProject({
        name: project.name || "",
        due: project.due ? project.due.slice(0, 10) : "",
        status: project.status || "Pending",
      });
      setShowAddProject(true);
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    showWarning(
      <div>
        <span>Are you sure you want to delete this project?</span>
        <div className="toast-confirm-buttons">
          <button
            className="toast-confirm-button yes"
            onClick={() => {
              fetch(`http://localhost:5000/api/projects/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
              }).then((res) => {
                if (res.ok) {
                  setProjects(projects.filter((p) => p._id !== id));
                  showSuccess("Project deleted successfully!");
                  if (editId === id) setEditId(null);
                } else {
                  showWarning("Failed to delete project");
                }
                toast.dismiss();
              });
            }}
          >
            Yes
          </button>
          <button className="toast-confirm-button no" onClick={() => toast.dismiss()}>
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  return (
    <div className="tasklist-container">
      <div className="tasklist-heading-wrapper">
        <div className="tasklist-strip"></div>
        <h1 className="tasklist-heading">Projects</h1>
      </div>
      <div className="search-filter-wrapper">
        <SearchBar
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <div className="tasklist-list">
        {filteredProjects.length === 0 ? (
          <div className="no-tasks-container">
            <img src={NoProjectsImage} alt="No projects available" className="no-tasks-image" />
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div className="task-card" key={project._id}>
              <h2 className="task-title">{project.name}</h2>
              <p className="task-due">Due: {project.due ? project.due.slice(0, 10) : "No date"}</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${getProgressFromStatus(project.status)}%`,
                    backgroundColor: getProgressBarColor(project.status),
                    height: "8px",
                    borderRadius: "6px",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
              <span className={`task-status ${project.status?.toLowerCase()}`}>{project.status}</span>
              <div className="task-actions">
                <button className="edit-btn" onClick={() => handleEdit(project._id)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(project._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div
        className="add-task-btn"
        onClick={() => {
          setShowAddProject(true);
          setEditId(null);
        }}
      >
        <Lottie
          animationData={plusAnimation}
          loop
          style={{ width: 70, height: 70, cursor: "pointer", filter: "hue-rotate(111deg)" }}
        />
      </div>

      {showAddProject && (
        <div className="addtask-overlay">
          <div className="addtask-modal">
            <h2>{editId ? "Edit Project" : "Add New Project"}</h2>
            <input
              type="text"
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              autoFocus
            />
            <input
              type="date"
              value={newProject.due}
              onChange={(e) => setNewProject({ ...newProject, due: e.target.value })}
            />

            <div className="modal-dropdown" ref={modalDropdownRef}>
              <div className="modal-dropdown-header" onClick={() => setModalDropdownOpen(!modalDropdownOpen)}>
                {newProject.status}
                <span className={`modal-dropdown-arrow ${modalDropdownOpen ? "open" : ""}`}>▼</span>
              </div>
              {modalDropdownOpen && (
                <ul className="modal-dropdown-options">
                  {statusOptions.map((status) => (
                    <li
                      key={status}
                      className="modal-dropdown-option"
                      onClick={() => {
                        setNewProject({ ...newProject, status });
                        setModalDropdownOpen(false);
                      }}
                    >
                      {status}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="modal-actions">
              <button onClick={handleAddOrEditProject}>{editId ? "Update" : "Add"}</button>
              <button
                onClick={() => {
                  setShowAddProject(false);
                  setEditId(null);
                  setNewProject({ name: "", due: "", status: "Pending" });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
