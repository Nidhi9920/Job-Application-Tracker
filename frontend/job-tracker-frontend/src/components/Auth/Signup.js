import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";


function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/signup", {
        name,
        email,
        password,
      });

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed!");
      console.error(err);
    }
  };

  return (
    // <div className="container mt-5">
    //   <h2>Signup</h2>
    //   <form onSubmit={handleSubmit}>
    //    <div className="mb-3">
    //      <label>Name</label>
    //      <input
    //        type="name"
    //        className="form-control"
    //        value={name}
    //        onChange={(e) => setName(e.target.value)}
    //        required
    //      />
    //     </div>  
    //     <div className="mb-3">
    //       <label>Email</label>
    //       <input
    //         type="email"
    //         className="form-control"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div className="mb-3">
    //       <label>Password</label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <button type="submit" className="btn btn-success">
    //       Signup
    //     </button>
    //   </form>
    // </div>
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Row> 
        <Col>
          <Card className="p-4 shadow-sm">
            <Card.Title className="mb-3">Sign Up</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3"> 
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </Form.Group>
              <Button variant="primary" type="submit">Login</Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
