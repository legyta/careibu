// Import necessary libraries for routing and styling
import "./style/styles.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// Importing all the components for rendering the pages
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      {/* Implementing Routing to navigate the pages*/}
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
