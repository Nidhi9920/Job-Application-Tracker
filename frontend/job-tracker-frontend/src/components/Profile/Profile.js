// src/components/Profile/Profile.js
import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
const Profile = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        axios.get(process.env.REACT_APP_API_URL + "/profile/personal-details", {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          })
          .then((res) => {
            setUserName(res.data.name);
            setUserEmail(res.data.email);
          })
          .catch((err) => {
            console.error("Error fetching profile:", err);
          });
        }, []);
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage(null);

        // Validate password fields
        if (newPassword || confirmPassword) {
            if (newPassword !== confirmPassword) {
                setMessage({ variant: 'danger', text: 'New password and confirmation do not match.' });
                return;
            }
            if (!currentPassword) {
                setMessage({ variant: 'danger', text: 'Please enter your current password.' });
                return;
            }
        }

        // Show loading message
        setMessage({ variant: 'info', text: 'Saving changes...' });

        try {
            // If password change fields are filled, hit backend API
            if (newPassword && currentPassword) {
                const response = await fetch(process.env.REACT_APP_API_URL + "/profile/change-password", {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`, // use real token
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        currentPassword: currentPassword,
                        newPassword: newPassword,
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to change password");
                }
                console.log("Password changed")
                setMessage({ variant: 'success', text: 'Password changed successfully! Please login again.' });
            }

            // Simulate saving profile data (name/email) — replace with real API later
            console.log('Profile updated:', { userName, userEmail });

            // Reset fields
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage({ variant: 'danger', text: error.message || 'Something went wrong while updating profile.' });
        }
    };

    const handleCancel = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setMessage(null);
        setIsEditing(false);
    };

    return (
        <Card className="shadow-lg border-0 rounded-2xl p-4 bg-white">
            <Card.Body>
                <h2 className="text-3xl font-extrabold text-indigo-700 mb-5 pb-3 border-b-4 border-indigo-100">
                    Profile Settings
                </h2>

                {message && (
                    <Alert variant={message.variant} className="mb-4">
                        {message.text}
                    </Alert>
                )}

                <Form onSubmit={handleUpdate}>
                    {/* Personal Info */}
                    <Card className="mb-5 p-4 border-0 shadow-sm bg-light">
                        <Card.Title className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">
                            Personal Information
                        </Card.Title>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="profileName">
                                    <Form.Label className="fw-bold text-gray-700">Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        disabled={!isEditing}
                                        required
                                        className="rounded-lg shadow-sm"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="profileEmail">
                                    <Form.Label className="fw-bold text-gray-700">Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        disabled={!isEditing}
                                        required
                                        className="rounded-lg shadow-sm"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card>

                    {/* Password Change */}
                    <Card className="mb-5 p-4 border-0 shadow-sm bg-light">
                        <Card.Title className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">
                            Change Password
                        </Card.Title>
                        <Row>
                            <Col md={12} className="mb-4">
                                <Form.Group controlId="currentPassword">
                                    <Form.Label className="fw-bold text-gray-700">Current Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your current password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        disabled={!isEditing}
                                        required={isEditing && (newPassword || confirmPassword)}
                                        className="rounded-lg shadow-sm"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="newPassword">
                                    <Form.Label className="fw-bold text-gray-700">New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        disabled={!isEditing}
                                        className="rounded-lg shadow-sm"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="confirmPassword">
                                    <Form.Label className="fw-bold text-gray-700">Confirm New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        disabled={!isEditing}
                                        className="rounded-lg shadow-sm"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card>

                    {/* Buttons */}
                    {isEditing ? (
                        <div className="d-flex justify-content-end gap-3 mt-4">
                            <Button variant="outline-danger" onClick={handleCancel} className="px-4 rounded-pill fw-bold">
                                Cancel
                            </Button>
                            <Button variant="success" type="submit" className="px-4 rounded-pill fw-bold">
                                Save Changes
                            </Button>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-end mt-4">
                            <Button
                                variant="primary"
                                onClick={() => setIsEditing(true)}
                                className="px-4 rounded-pill fw-bold bg-indigo-600 border-indigo-600 hover:bg-indigo-700"
                            >
                                Edit Profile
                            </Button>
                        </div>
                    )}
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Profile;
