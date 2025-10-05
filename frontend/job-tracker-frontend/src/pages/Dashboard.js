// src/pages/Dashboard.js
import React, { useState } from "react";
import { Container, Row, Col, Button, Navbar, Card } from "react-bootstrap";
import JobForm from "../components/Jobs/JobForm";
import JobList from "../components/Jobs/JobList";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"

// src/pages/Dashboard.js

// --- Icon Components for visual appeal ---



const LogOutIcon = () => (
// FIX 2: Restored full SVG attributes (width, height, viewbox, stroke) and correct classes.
// Using 'ml-2 inline-block' for spacing and alignment.
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 inline-block">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
</svg>
);
// ----------------------------------------

const Dashboard = () => {
  const navigate = useNavigate();
  const [editingJob, setEditingJob] = useState(null); // null = JobList, {} = Add New, {job} = Edit
  const [reloadFlag, setReloadFlag] = useState(false);
  const [activeSection, setActiveSection] = useState("jobs"); // "jobs", "add", "profile"


  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Called when Edit button clicked in JobList
  const handleEdit = (job) => {
    setEditingJob(job);
    setActiveSection("add");
  };

  // Called after adding/updating a job in JobForm
  const handleFormSubmit = () => {
    setEditingJob(null);
    setReloadFlag(!reloadFlag); // refresh JobList
    setActiveSection("jobs");
  };

  const isAddActive = activeSection === "add" || (activeSection === "jobs" && editingJob);
  const isJobsActive = activeSection === "jobs" && !editingJob;
  const isProfileActive = activeSection === "profile";

  return (
    <div className="font-inter bg-gray-50 min-h-screen">
         {/* Attractive Navbar */}
         <Navbar 
        bg="dark" 
        variant="dark" 
        expand="lg" 
        // Tailwind classes for a modern look: shadow, border color, no default padding
        className="shadow-xl border-b-4 border-indigo-500 sticky top-0 z-50 p-0"
      >
        <Container fluid className="px-4 sm:px-8 py-3">
          
          {/* Brand/Logo Section - Styled for better look */}
          <Navbar.Brand className="text-xl font-extrabold flex items-center space-x-4 text-indigo-300 hover:text-indigo-200 transition cursor-pointer">
            <span className="leading-none">Job Application Tracker</span>
          </Navbar.Brand>
          
          {/* Logout Button - ALIGNED RIGHT with ms-auto (Margin-Start: Auto) */}
          <Button 
            variant="outline-light" 
            onClick={logout} 
            // ms-auto pushes the button to the right
            className="ms-auto flex items-center font-medium transition duration-300 hover:bg-indigo-500 hover:text-white border-2 border-indigo-400 text-indigo-300 rounded-lg p-2"
          >
            Logout
            <LogOutIcon />
          </Button>

        </Container>
      </Navbar>
      
      {/* Main Content Container */}
      <Container fluid className="mt-4">
        <Row>
          {/* Sidebar - Clean, modern card look */}
          <Col md={3} className="p-3">
            <div className="bg-white p-4 shadow-lg rounded-xl h-full sticky top-[7.5rem]">
                <h5 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Menu</h5>
                
                {/* Menu Item: Add New Job (or Edit Job) */}
                <Card
                  className={`mb-3 p-3 transition duration-150 rounded-lg cursor-pointer ${
                    isAddActive
                      ? "bg-indigo-500 text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
                  }`}
                  onClick={() => { setEditingJob({}); setActiveSection("add"); }} // {} means Add New
                >
                  <span className="font-medium">➕ Add New Job</span>
                </Card>
                
                {/* Menu Item: My Jobs (List) */}
                <Card
                  className={`mb-3 p-3 transition duration-150 rounded-lg cursor-pointer ${
                    isJobsActive
                      ? "bg-indigo-500 text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
                  }`}
                  onClick={() => { setEditingJob(null); setActiveSection("jobs"); }} // null means show List
                >
                  <span className="font-medium">📋 My Jobs</span>
                </Card>
                
                {/* Menu Item: Profile */}
                <Card
                  // Applying the new active/hover classes
                  className={`mb-3 p-3 transition duration-150 rounded-lg cursor-pointer ${
                    isProfileActive 
                      ? "bg-indigo-500 text-white shadow-md" 
                      : "bg-gray-50 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
                  }`}
                  onClick={() => setActiveSection("profile")}
                >
                   <span className="font-medium">👤 Profile Settings</span>
                </Card>
            </div>
          </Col>

          {/* Main Content Area - Wrapped in a clean card for better separation */}
          <Col md={9} className="p-3">
             <div className="bg-white p-6 shadow-lg rounded-xl min-h-[85vh]">
                {/* Conditional Rendering Logic */}
                {activeSection === "profile" ? (
                    <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg min-h-[500px]">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Profile Settings</h2>
                        <p className="text-gray-600">This is the placeholder for your user profile and account configuration.</p>
                    </div>
                ) : (
                    editingJob ? (
                        <JobForm editingJob={editingJob} onFormSubmit={handleFormSubmit} />
                    ) : (
                        <JobList onEdit={handleEdit} reloadFlag={reloadFlag} />
                    )
                )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Dashboard;
