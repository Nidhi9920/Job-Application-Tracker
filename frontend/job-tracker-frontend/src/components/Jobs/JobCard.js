import React from "react";
import { Card, Button, Badge } from "react-bootstrap";

const JobCard = ({ job, onDelete }) => {
  const statusVariant = {
    Applied: "primary",
    Interview: "warning",
    Offer: "success",
    Rejected: "danger",
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
        <Badge bg={statusVariant[job.status] || "secondary"}>{job.status}</Badge>
        {job.notes && <Card.Text className="mt-2">{job.notes}</Card.Text>}
        <Button variant="danger" className="mt-2" onClick={() => onDelete(job.id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default JobCard;
