require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.get("/", (req, res) => {
  res.send("Backend server is running");
});


const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Ongoing", "Completed"], default: "Pending" },
  due: { type: Date, required: true },
});
const Task = mongoose.model("Task", taskSchema);


const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Ongoing", "Completed"], default: "Pending" },
  due: { type: Date, required: true },
});
const Project = mongoose.model("Project", projectSchema);

// CRUD Routes for Tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ due: 1 });
    res.json(tasks);
  } catch {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { title, status, due } = req.body;
    const task = new Task({ title, status, due });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch {
    res.status(400).json({ error: "Failed to create task" });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Task not found" });
    res.json(updated);
  } catch {
    res.status(400).json({ error: "Failed to update task" });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch {
    res.status(400).json({ error: "Failed to delete task" });
  }
});

// CRUD Routes for Projects
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ due: 1 });
    res.json(projects);
  } catch {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    const { name, status, due } = req.body;
    const project = new Project({ name, status, due });
    const saved = await project.save();
    res.status(201).json(saved);
  } catch {
    res.status(400).json({ error: "Failed to create project" });
  }
});

app.put("/api/projects/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Project not found" });
    res.json(updated);
  } catch {
    res.status(400).json({ error: "Failed to update project" });
  }
});

app.delete("/api/projects/:id", async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch {
    res.status(400).json({ error: "Failed to delete project" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
