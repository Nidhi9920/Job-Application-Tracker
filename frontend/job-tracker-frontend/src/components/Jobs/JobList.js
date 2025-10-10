import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobs, deleteJob } from "../../api/jobApi";
import { Card, Button } from "react-bootstrap";

function JobList({ onEdit, reloadFlag }) {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in!");
      navigate("/login");
      return;
    }

    try {
      const response = await getAllJobs();
      if (Array.isArray(response.data)) {
        setJobs(response.data);
      } else {
        console.error("Unexpected response:", response.data);
        setJobs([]);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch jobs. Please login again.");
      navigate("/login");
    }
  }, [navigate, reloadFlag]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteJob(id);
      fetchJobs();
    } catch (err) {
      console.error(err);
      alert("Failed to delete job.");
    }
  };

  return (
    <div>
      <h5>My Jobs</h5>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="d-flex flex-wrap gap-3">
          {jobs.map((job) => (
            <Card key={job.id} style={{ width: "18rem" }} className="shadow-sm">
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                <Card.Text>
                  <strong>Status:</strong> {job.status}<br />
                  <strong>Applied On:</strong> {job.appliedDate || "N/A"}<br />
                  {job.description}<br />
                  <em>{job.notes || "No notes"}</em>
                </Card.Text>
                <Button variant="warning" size="sm" className="me-2" onClick={() => onEdit(job)}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(job.id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobList;
