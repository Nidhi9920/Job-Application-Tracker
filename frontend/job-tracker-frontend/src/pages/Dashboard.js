// src/pages/Dashboard.js
import React, { useState } from "react";
import { Container, Row, Col, Button, Navbar, Card } from "react-bootstrap";
import JobForm from "../components/Jobs/JobForm";
import JobList from "../components/Jobs/JobList";
import Profile from "../components/Profile/Profile";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"


// --- Icon Components for better organization and visual appeal ---

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
    <Icon 
        pathData={pathData} 
        className="mr-2 h-5 w-5" // Larger for menu
    />
);

// Icon data for specific menu items
const AddIconData = "M12 5v14M5 12h14"; // Plus sign
const ListIconData = "M3 7h18M3 12h18M3 17h18"; // Three lines
const ProfileIconData = "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 12A4 4 0 1 0 12 4A4 4 0 1 0 12 12Z"; // User circle

// ----------------------------------------


const Dashboard = () => {
    const navigate = useNavigate();
    const [editingJob, setEditingJob] = useState(null); 
    const [reloadFlag, setReloadFlag] = useState(false);
    const [activeSection, setActiveSection] = useState("jobs"); 

    // --- Core function to manage state transitions ---
    const handleSectionChange = (section) => {
        // If clicking the currently active section, prevent redundant action.
        // This is safe for 'add' as it always sets editingJob on entry.
        if (activeSection === section) {
            return; 
        }

        setActiveSection(section);
        
        if (section === "jobs") {
            setEditingJob(null); // Show the job list
        } else if (section === "add") {
            // Set to empty object only if we are moving to 'Add New' 
            // and are not already in an editing state.
            if (!editingJob || !editingJob.id) {
                setEditingJob({});
            }
        } else if (section === "profile") {
            setEditingJob(null); // Clear editing state when going to profile
        }
    }


    // Logout
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Called when Edit button clicked in JobList
    const handleEdit = (job) => {
        setEditingJob(job);
        setActiveSection("add"); // Switch to the form view
    };

    // Called after adding/updating a job in JobForm
    const handleFormSubmit = () => {
        setEditingJob(null);
        setReloadFlag(!reloadFlag); // Refresh JobList
        setActiveSection("jobs"); // Switch back to the list view
    };

    // Renders the main content based on activeSection
    const renderContent = () => {
        if (activeSection === "profile") {
            return <Profile />;
        }

        // Renders the JobForm if in 'add' section OR if editingJob is set 
        // while theoretically in the 'jobs' section (e.g., from handleEdit).
        if (activeSection === "add" || (activeSection === "jobs" && editingJob)) {
            return <JobForm editingJob={editingJob} onFormSubmit={handleFormSubmit} />;
        }

        // Default: activeSection is "jobs" and editingJob is null
        return <JobList onEdit={handleEdit} reloadFlag={reloadFlag} />;
    };


    // Active state classes for sidebar menu items
    const getCardClasses = (section) => {
        // Define active conditions for each section
        const isActive = 
            (section === "add" && (activeSection === "add" || editingJob)) ||
            (section === "jobs" && activeSection === "jobs" && !editingJob) ||
            (section === "profile" && activeSection === "profile");

        return `mb-3 p-3 transition duration-150 rounded-lg cursor-pointer flex items-center ${
            isActive
                ? "bg-indigo-600 text-white shadow-lg border-2 border-indigo-700"
                : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 border border-gray-200"
        }`;
    };


    return (
        <div className="font-sans bg-gray-100 min-h-screen flex flex-col">
            
            {/* Attractive Navbar */}
            <Navbar 
                bg="dark" 
                variant="dark" 
                expand="lg" 
                className="shadow-xl border-b-4 border-indigo-600 sticky top-0 z-50 p-0"
            >
                <Container fluid className="px-4 sm:px-8 py-3">
                    
                    {/* Brand/Logo Section */}
                    <Navbar.Brand className="text-2xl font-black flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition cursor-default">
                        <span>  Job Tracker Dashboard</span>
                    </Navbar.Brand>
                    
                    {/* Logout Button */}
                    <Button 
                        variant="outline-light" 
                        onClick={logout} 
                        className="ms-auto flex items-center font-semibold text-sm transition duration-300 bg-transparent hover:bg-indigo-500 hover:text-white border-2 border-indigo-400 text-indigo-300 rounded-full py-2 px-4"
                    >
                        Logout
                        <LogOutIcon />
                    </Button>

                </Container>
            </Navbar>
            
            {/* Main Content Container */}
            <Container fluid className="mt-6 flex-grow">
                <Row>
                    {/* Sidebar - Clean, modern card look */}
                    <Col lg={3} className="p-3">
                        {/* Sticky sidebar for better UX */}
                        <div className="bg-white p-5 shadow-2xl rounded-xl border border-gray-100 sticky top-24">
                            <h5 className="text-xl font-bold text-gray-800 mb-5 border-b pb-3 text-center">Dashboard Menu</h5>
                            
                            {/* Menu Item: Add New Job (or Edit Job) */}
                            <Card
                                className={getCardClasses("add")}
                                onClick={() => handleSectionChange("add")} 
                            >
                                <MenuIcon pathData={AddIconData} />
                                <span className="font-medium">
                                    {/* Dynamic text based on state */}
                                    {editingJob && editingJob.id ? "✏️ Edit Current Job" : "✨ Add New Job"}
                                </span>
                            </Card>
                            
                            {/* Menu Item: My Jobs (List) */}
                            <Card
                                className={getCardClasses("jobs")}
                                onClick={() => handleSectionChange("jobs")} 
                            >
                                <MenuIcon pathData={ListIconData} />
                                <span className="font-medium">📋 My Job Applications</span>
                            </Card>
                            
                            {/* Menu Item: Profile */}
                            <Card
                                className={getCardClasses("profile")}
                                onClick={() => handleSectionChange("profile")}
                            >
                                <MenuIcon pathData={ProfileIconData} />
                                <span className="font-medium">⚙️ Profile Settings</span>
                            </Card>
                        </div>
                    </Col>

                    {/* Main Content Area */}
                    <Col lg={9} className="p-3">
                        <div className="bg-white p-8 shadow-2xl rounded-xl border border-gray-100">
                            {renderContent()}
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* --- Footer Component --- */}
            <footer className="bg-gray-800 text-white mt-8 p-3 shadow-inner border-t-4 border-indigo-600">
                <Container fluid className="text-center text-sm px-4">
                    <p className="mb-1 text-gray-400">
                        &copy; {new Date().getFullYear()} Job Application Tracker. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-500">
                        Built with React, React-Bootstrap, and Tailwind CSS.
                    </p>
                </Container>
            </footer>
            {/* ------------------------ */}
        </div>
    );
};

export default Dashboard;