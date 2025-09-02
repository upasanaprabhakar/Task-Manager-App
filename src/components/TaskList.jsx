import React, { useState, useRef, useEffect } from "react";
import "./TaskList.css";
import Lottie from "lottie-react";
import plusAnimation from "../assets/plus.json";
import SearchBar from "../components/SearchBar";
import { showSuccess, showInfo, showWarning } from "../components/ToastProvider";
import { toast } from "react-toastify";
import noTaskImg from "../assets/No_Task.png";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", due: "", status: "Pending" });
  const [editId, setEditId] = useState(null);
  const [modalDropdownOpen, setModalDropdownOpen] = useState(false);
  const modalDropdownRef = useRef(null);
  const statusOptions = ["Pending", "Ongoing", "Completed"];

  // Fetch tasks
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data || []))
      .catch(() => showWarning("Failed to load tasks"));
  }, []);

  // Close dropdown when clicking outside
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

  const filteredTasks = tasks.filter(
    (task) =>
      task.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "All" || task.status === filter)
  );

  const handleAddOrEditTask = () => {
    if (!newTask.title.trim() || !newTask.due) {
      showWarning("Please provide a title and due date.");
      return;
    }

    const token = localStorage.getItem("token");
    const url = editId
      ? `http://localhost:5000/api/tasks/${editId}`
      : "http://localhost:5000/api/tasks";
    const method = editId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editId) {
          setTasks(tasks.map((t) => (t._id === editId ? data : t)));
          showInfo("Task updated successfully!");
        } else {
          setTasks([...tasks, data]);
          showSuccess("Task added successfully!");
        }
        setShowAddTask(false);
        setEditId(null);
        setNewTask({ title: "", due: "", status: "Pending" });
      })
      .catch(() => showWarning("Failed to save task"));
  };

  const handleEdit = (id) => {
    const task = tasks.find((t) => t._id === id);
    if (task) {
      setNewTask({
        title: task.title || "",
        due: task.due ? task.due.slice(0, 10) : "",
        status: task.status || "Pending",
      });
      setShowAddTask(true);
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    showWarning(
      <div>
        <span>Are you sure you want to delete this task?</span>
        <div className="toast-confirm-buttons">
          <button
            className="toast-confirm-button yes"
            onClick={() => {
              fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
              }).then((res) => {
                if (res.ok) {
                  setTasks(tasks.filter((t) => t._id !== id));
                  showSuccess("Task deleted successfully!");
                  if (editId === id) setEditId(null);
                } else {
                  showWarning("Failed to delete task");
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
        <h1 className="tasklist-heading">Tasks</h1>
      </div>
      <div className="search-filter-wrapper">
        <SearchBar
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <div className="tasklist-list">
        {filteredTasks.length === 0 ? (
          <div className="no-tasks-container">
            <img src={noTaskImg} alt="No tasks available" className="no-tasks-image" />
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div className="task-card" key={task._id}>
              <h2 className="task-title">{task.title}</h2>
              <p className="task-due">Due: {task.due ? task.due.slice(0, 10) : "No date"}</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${getProgressFromStatus(task.status)}%`,
                    backgroundColor: getProgressBarColor(task.status),
                    height: "8px",
                    borderRadius: "6px",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
              <span className={`task-status ${task.status?.toLowerCase()}`}>{task.status}</span>
              <div className="task-actions">
                <button className="edit-btn" onClick={() => handleEdit(task._id)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(task._id)}>
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
          setShowAddTask(true);
          setEditId(null);
        }}
      >
        <Lottie
          animationData={plusAnimation}
          loop
          style={{ width: 70, height: 70, cursor: "pointer", filter: "hue-rotate(111deg)" }}
        />
      </div>

      {showAddTask && (
        <div className="addtask-overlay">
          <div className="addtask-modal">
            <h2>{editId ? "Edit Task" : "Add New Task"}</h2>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              autoFocus
            />
            <input
              type="date"
              value={newTask.due}
              onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
            />

            <div className="modal-dropdown" ref={modalDropdownRef}>
              <div className="modal-dropdown-header" onClick={() => setModalDropdownOpen(!modalDropdownOpen)}>
                {newTask.status}
                <span className={`modal-dropdown-arrow ${modalDropdownOpen ? "open" : ""}`}>▼</span>
              </div>
              {modalDropdownOpen && (
                <ul className="modal-dropdown-options">
                  {statusOptions.map((status) => (
                    <li
                      key={status}
                      className="modal-dropdown-option"
                      onClick={() => {
                        setNewTask({ ...newTask, status });
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
              <button onClick={handleAddOrEditTask}>{editId ? "Update" : "Add"}</button>
              <button
                onClick={() => {
                  setShowAddTask(false);
                  setEditId(null);
                  setNewTask({ title: "", due: "", status: "Pending" });
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

export default TaskList;
