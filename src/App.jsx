
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import Projects from "./pages/Projects";
import Auth from "./pages/Auth";
import ToastProvider from "./components/ToastProvider";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/tasklist" element={<TaskList />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/" element={<Auth mode="login" />} />
            <Route path="/auth/register" element={<Auth mode="register" />} />
          </Routes>
        </main>
        <ToastProvider />
      </div>
    </Router>
  );
}

export default App;
