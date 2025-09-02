require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

const client = new MongoClient(process.env.MONGO_URI);
let db;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
async function connectToDbAndStartServer() {
  try {
    await client.connect();
    db = client.db();
    console.log('✅ Successfully connected to MongoDB');
    app.listen(port, () => {
      console.log(`🚀 Task backend listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

// Utils
const safeObjectId = (id) => ObjectId.isValid(id) ? new ObjectId(id) : null;

// JWT Auth Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'A token is required for authentication' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
  next();
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) return res.status(400).send("All input is required");

    const existingUser = await db.collection('users').findOne({ username });
    if (existingUser) return res.status(409).send("User already exists. Please login");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.collection('users').insertOne({ username, password: hashedPassword });

    const token = jwt.sign({ user_id: user.insertedId, username }, process.env.JWT_SECRET || 'default_secret', { expiresIn: "2h" });
    res.status(201).json({ token });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).send("Server error");
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) return res.status(400).send("All input is required");

    const user = await db.collection('users').findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ user_id: user._id, username }, process.env.JWT_SECRET || 'default_secret', { expiresIn: "2h" });
      return res.status(200).json({ token });
    }
    res.status(400).send("Invalid credentials");
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send("Server error");
  }
});

app.get('/api/user/me', verifyToken, (req, res) => {
  res.status(200).json({ username: req.user.username });
});

// Task Routes
app.get('/api/tasks', verifyToken, async (req, res) => {
  try {
    const userId = safeObjectId(req.user.user_id);
    const tasks = await db.collection('tasks').find({ userId }).sort({ due: 1 }).toArray();
    res.json(tasks.map(task => ({ ...task, id: task._id })));
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Internal server error');
  }
});

app.post('/api/tasks', verifyToken, async (req, res) => {
  try {
    const userId = safeObjectId(req.user.user_id);
    const { title, status = 'Pending', due } = req.body;

    const taskData = { userId, title, status, due: new Date(due), createdAt: new Date() };
    const result = await db.collection('tasks').insertOne(taskData);
    const task = await db.collection('tasks').findOne({ _id: result.insertedId });
    res.status(201).json({ ...task, id: task._id });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).send('Internal server error');
  }
});

app.put('/api/tasks/:id', verifyToken, async (req, res) => {
  try {
    const taskId = safeObjectId(req.params.id);
    const userId = safeObjectId(req.user.user_id);
    const { title, status, due } = req.body;

    await db.collection('tasks').updateOne({ _id: taskId, userId }, { $set: { title, status, due: new Date(due) } });
    const updatedTask = await db.collection('tasks').findOne({ _id: taskId });
    res.json({ ...updatedTask, id: updatedTask._id });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).send('Internal server error');
  }
});

app.delete('/api/tasks/:id', verifyToken, async (req, res) => {
  try {
    const taskId = safeObjectId(req.params.id);
    const userId = safeObjectId(req.user.user_id);

    await db.collection('tasks').deleteOne({ _id: taskId, userId });
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).send('Internal server error');
  }
});

// Project Routes
app.get('/api/projects', verifyToken, async (req, res) => {
  try {
    const userId = safeObjectId(req.user.user_id);
    const projects = await db.collection('projects').find({ userId }).sort({ due: 1 }).toArray();
    res.json(projects.map(project => ({ ...project, id: project._id })));
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).send('Internal server error');
  }
});

app.post('/api/projects', verifyToken, async (req, res) => {
  try {
    const userId = safeObjectId(req.user.user_id);
    const { name, status = 'Pending', due } = req.body;

    const projectData = { userId, name, status, due: new Date(due), createdAt: new Date() };
    const result = await db.collection('projects').insertOne(projectData);
    const project = await db.collection('projects').findOne({ _id: result.insertedId });
    res.status(201).json({ ...project, id: project._id });
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).send('Internal server error');
  }
});

app.put('/api/projects/:id', verifyToken, async (req, res) => {
  try {
    const projectId = safeObjectId(req.params.id);
    const userId = safeObjectId(req.user.user_id);
    const { name, status, due } = req.body;

    await db.collection('projects').updateOne({ _id: projectId, userId }, { $set: { name, status, due: new Date(due) } });
    const updatedProject = await db.collection('projects').findOne({ _id: projectId });
    res.json({ ...updatedProject, id: updatedProject._id });
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).send('Internal server error');
  }
});

app.delete('/api/projects/:id', verifyToken, async (req, res) => {
  try {
    const projectId = safeObjectId(req.params.id);
    const userId = safeObjectId(req.user.user_id);

    await db.collection('projects').deleteOne({ _id: projectId, userId });
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).send('Internal server error');
  }
});

connectToDbAndStartServer();
