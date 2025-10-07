// src/pages/Dashboard.js
import React, { useState } from "react";
import { Container, Row, Col, Button, Navbar, Card } from "react-bootstrap";
import JobForm from "../components/Jobs/JobForm";
import JobList from "../components/Jobs/JobList";
import Profile from "../components/Profile/Profile";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

// Icon Components
const Icon = ({ pathData, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block align-text-bottom ${className}`}
  >
    <path d={pathData} />
  </svg>
);

const LogOutIcon = () => (
  <Icon
    pathData="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17L21 12L16 7M21 12L9 12"
    className="ml-2"
  />
);

const MenuIcon = ({ pathData }) => (
  <Icon pathData={pathData} className="mr-2 h-5 w-5" />
);

const AddIconData = "M12 5v14M5 12h14";
const ListIconData = "M3 7h18M3 12h18M3 17h18";
const ProfileIconData =
  "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 12A4 4 0 1 0 12 4A4 4 0 1 0 12 12Z";

const Dashboard = () => {
  const navigate = useNavigate();
  const [editingJob, setEditingJob] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(false);
  const [activeSection, setActiveSection] = useState("jobs");

  const handleSectionChange = (section) => {
    if (activeSection === section) return;
    setActiveSection(section);

    if (section === "jobs") setEditingJob(null);
    else if (section === "add") {
      if (!editingJob || !editingJob.id) setEditingJob({});
    } else if (section === "profile") setEditingJob(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setActiveSection("add");
  };

  const handleFormSubmit = () => {
    setEditingJob(null);
    setReloadFlag(!reloadFlag);
    setActiveSection("jobs");
  };

  // Get bootstrap Card classes with active style
  const getCardStyles = (section) => {
    const isActive =
      (section === "add" && (activeSection === "add" || editingJob)) ||
      (section === "jobs" && activeSection === "jobs" && !editingJob) ||
      (section === "profile" && activeSection === "profile");

    return {
      backgroundColor: isActive ? "#1e1b4b" : "#2c2670",
      color: "white",
      cursor: "pointer",
      marginBottom: "1rem",
      padding: "0.8rem 1rem",
      border: isActive ? "2px solid #5a4fcf" : "1px solid #5a4fcf",
      boxShadow: isActive ? "0 4px 8px rgba(0,0,0,0.3)" : "0 2px 4px rgba(0,0,0,0.2)",
      display: "flex",
      alignItems: "center",
      transition: "all 0.2s ease-in-out",
    };
  };

  const renderContent = () => {
    if (activeSection === "profile") return <Profile />;
    if (activeSection === "add" || (activeSection === "jobs" && editingJob))
      return <JobForm editingJob={editingJob} onFormSubmit={handleFormSubmit} />;
    return <JobList onEdit={handleEdit} reloadFlag={reloadFlag} />;
  };

  return (
    <div className="font-sans min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <Navbar
        style={{ backgroundColor: "#1e1b4b" }}
        variant="dark"
        expand="lg"
        className="shadow-xl sticky-top"
      >
        <Container fluid className="px-4 sm:px-8 py-3">
          <Navbar.Brand className="text-2xl fw-bold text-white">
            Job Tracker Dashboard
          </Navbar.Brand>
          <Button
            variant="outline-light"
            onClick={logout}
            className="ms-auto fw-semibold text-sm custom-logout-btn"
            >
            Logout
            <LogOutIcon />
        </Button>

        </Container>
      </Navbar>

      {/* Main Content */}
      <Container fluid className="mt-4 flex-grow-1">
        <Row>
          {/* Sidebar */}
          <Col lg={3} className="p-3">
            <div
              className="p-4 shadow-lg rounded border border-primary sticky-top"
              style={{ backgroundColor: "#1e1b4b", color: "white", top: "6rem" }}
            >
              <h5 className="text-center fw-bold mb-3 border-bottom pb-2">Dashboard Menu</h5>

              <Card style={getCardStyles("add")} onClick={() => handleSectionChange("add")}>
                <MenuIcon pathData={AddIconData} />
                <span className="ms-2">
                  {editingJob && editingJob.id ? "✏️ Edit Current Job" : "Add New Job"}
                </span>
              </Card>

              <Card style={getCardStyles("jobs")} onClick={() => handleSectionChange("jobs")}>
                <MenuIcon pathData={ListIconData} />
                <span className="ms-2">My Job Applications</span>
              </Card>

              <Card style={getCardStyles("profile")} onClick={() => handleSectionChange("profile")}>
                <MenuIcon pathData={ProfileIconData} />
                <span className="ms-2">Profile Settings</span>
              </Card>
            </div>
          </Col>

          {/* Main Area */}
          <Col lg={9} className="p-3">
            <div className="p-4 shadow rounded" style={{ backgroundColor: "white" }}>
              {renderContent()}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white mt-4 p-3 text-center">
        <Container fluid>
          &copy; {new Date().getFullYear()} Job Tracker. All rights reserved.
        </Container>
      </footer>
    </div>
  );
};

export default Dashboard;
