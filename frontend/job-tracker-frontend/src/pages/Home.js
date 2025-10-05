import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h1>Welcome to Job Tracker</h1>
      <button className="btn btn-primary m-2" onClick={() => navigate("/login")}>
        Login
      </button>
      <button className="btn btn-success m-2" onClick={() => navigate("/signup")}>
        Signup
      </button>
    </div>
  );
}

export default Home;
