import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { addJob, updateJob } from "../../api/jobApi";

const JobForm = ({ editingJob, onFormSubmit }) => {
  const isEditMode = editingJob && Object.keys(editingJob).length > 0;

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isEditMode) {
      setTitle(editingJob.title);
      setCompany(editingJob.company);
      setStatus(editingJob.status);
      setAppliedDate(editingJob.appliedDate);
      setDescription(editingJob.description);
      setNotes(editingJob.notes);
    } else {
      // clear form for Add Job
      setTitle("");
      setCompany("");
      setStatus("");
      setAppliedDate("");
      setDescription("");
      setNotes("");
    }
  }, [editingJob, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = { title, company, status, appliedDate, description, notes };

    try {
      if (isEditMode) {
        await updateJob(editingJob.id, jobData);
        alert("Job updated successfully!");
      } else {
        await addJob(jobData);
        alert("Job added successfully!");
      }
      onFormSubmit();
    } catch (err) {
      console.error(err);
      alert("Failed to save job.");
    }
  };

  return (
    <Card className="mb-4 shadow-sm p-3">
      <h5>{isEditMode ? "Edit Job" : "Add New Job"}</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Applied On</Form.Label>
          <Form.Control
            type="date"
            value={appliedDate}
            onChange={(e) => setAppliedDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {isEditMode ? "Update Job" : "Add Job"}
        </Button>
      </Form>
    </Card>
  );
};

export default JobForm;
