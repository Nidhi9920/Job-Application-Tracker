import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", variant: "" }); 
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  // High-quality, professional workspace image URL
  const backgroundImageUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2940&auto=format&fit=crop";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", variant: "" });
    setLoading(true);

    try {
      await axios.post(process.env.REACT_APP_API_URL + "/auth/signup", {
        name,
        email,
        password,
      });

      setMessage({ text: "Success! Account created. Redirecting to login...", variant: "success" });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Signup failed. Please try again or check your server.";
      setMessage({ text: errorMsg, variant: "danger" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // 1. BACKGROUND CONTAINER: Set image, cover properties, and full height
    <Container 
      className="d-flex justify-content-center align-items-center" 
      fluid 
      style={{ 
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
        {/* 2. OVERLAY: Semi-transparent dark overlay for contrast */}
        <div 
            className="position-absolute w-100 h-100" 
            style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly darker overlay for forms
                zIndex: 1 
            }}
        ></div>

      {/* 3. CARD: Positioned above the overlay (zIndex: 2) */}
      <Card 
        className="p-4 shadow-lg border-0 position-relative" // Added position-relative
        style={{ 
            maxWidth: "400px", 
            width: "100%", 
            borderRadius: "1rem", 
            zIndex: 2, // Ensures the card is above the overlay
            backgroundColor: 'rgba(255, 255, 255, 0.95)' // Slightly transparent white card for depth
        }} 
      >
        <Card.Body>
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Join Job Tracker</h2>
            <p className="text-secondary small">
              Your centralized hub for job application success.
            </p>
          </div>

          {message.text && (
            <Alert variant={message.variant} className="text-center">
              {message.text}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label className="fw-medium">Full Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your full name"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail"> 
              <Form.Label className="fw-medium">Email Address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label className="fw-medium">Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Minimum 6 characters"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                minLength={6}
              />
            </Form.Group>
            
            <div className="d-grid">
              <Button 
                variant="primary" 
                type="submit" 
                size="lg"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </Form>

          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account?{" "}
              <Button 
                variant="link" 
                onClick={() => navigate("/login")}
                className="p-0 border-0 align-baseline text-primary fw-medium"
              >
                Log In
              </Button>
            </small>
          </div>

        </Card.Body>
      </Card>
    </Container>
  );
}

export default Signup;