import React, { useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", variant: "" }); 
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // High-quality, professional workspace image URL for consistent background
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", variant: "" });
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", { email, password });
      
      // Clean up the token before saving it
      const token = res.data.token;
      localStorage.setItem("token", token.trim());
      
      setMessage({ text: "Login successful! Redirecting...", variant: "success" });
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      // Replace alert() with professional Alert component
      const errorMsg = err.response?.data?.message || "Login failed! Please check your credentials.";
      setMessage({ text: errorMsg, variant: "danger" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // 1. BACKGROUND CONTAINER: Full height, set background image, and centering
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
        {/* 2. OVERLAY: Semi-transparent dark overlay for contrast and depth */}
        <div 
            className="position-absolute w-100 h-100" 
            style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.6)', 
                zIndex: 1 
            }}
        ></div>

      {/* 3. CARD: Positioned above the overlay (zIndex: 2) with modern styling */}
      <Card 
        className="p-4 shadow-lg border-0 position-relative"
        style={{ 
            maxWidth: "400px", 
            width: "100%", 
            borderRadius: "1rem", 
            zIndex: 2, 
            backgroundColor: 'rgba(255, 255, 255, 0.95)' // Slightly transparent white card
        }} 
      >
        <Card.Body>
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Welcome Back</h2>
            <p className="text-secondary small">
              Sign in to manage your applications.
            </p>
          </div>
          
          {/* Display Alert Message component */}
          {message.text && (
            <Alert variant={message.variant} className="text-center">
              {message.text}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
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
                placeholder="Enter password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </Form.Group>
            
            {/* Submit button with loading state */}
            <div className="d-grid">
              <Button 
                variant="primary" 
                type="submit" 
                size="lg"
                disabled={loading}
              >
                {loading ? 'Logging In...' : 'Log In'}
              </Button>
            </div>
          </Form>

          {/* Link to Signup page */}
          <div className="text-center mt-3">
            <small className="text-muted">
              Don't have an account?{" "}
              <Button 
                variant="link" 
                onClick={() => navigate("/signup")}
                className="p-0 border-0 align-baseline text-primary fw-medium"
              >
                Sign Up
              </Button>
            </small>
          </div>

        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;