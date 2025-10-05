import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./pages/Dashboard";
import JobList from "./components/Jobs/JobList";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route -> Redirect to /login */}
        <Route path="/" element={<Home />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Dashboard with nested route */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="jobs" element={<JobList />} /> {/* nested route */}
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
