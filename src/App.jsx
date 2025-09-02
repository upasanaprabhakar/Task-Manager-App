import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import Projects from "./pages/Projects";
import ToastProvider from "./components/ToastProvider";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";

function AppContent() {
  const location = useLocation();
  // hide Navbar on these routes
  const hideNavbarRoutes = ["/", "/register"];

  return (
    <div className="app">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasklist" element={<TaskList />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </main>
      <ToastProvider />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
