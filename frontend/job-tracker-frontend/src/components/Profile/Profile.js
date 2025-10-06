// src/components/Profile/Profile.js
import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const Profile = () => {
    // Mock state for user data (replace with actual context/API calls later)
    const [userName, setUserName] = useState("Jane Doe");
    const [userEmail, setUserEmail] = useState("jane.doe@example.com");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState(null);

    const handleUpdate = (e) => {
        e.preventDefault();
        
        setMessage(null); // Clear previous message
        
        // Basic validation for password change
        if (newPassword || confirmPassword) {
            if (newPassword !== confirmPassword) {
                setMessage({ variant: 'danger', text: 'New password and confirmation do not match.' });
                return;
            }
            if (!currentPassword) {
                setMessage({ variant: 'danger', text: 'You must enter your current password to change it.' });
                return;
            }
        }


        // 1. Simulate API call delay
        setMessage({ variant: 'info', text: 'Saving changes...' });

        setTimeout(() => {
            // 2. Logic to save changes goes here
            console.log('Profile updated:', { userName, userEmail, newPassword: newPassword ? 'changed' : 'not changed' });
            
            // 3. Reset password fields on success
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            // 4. Show success message
            setMessage({ variant: 'success', text: 'Profile updated successfully! Login again if password was changed.' });
            setIsEditing(false);
        }, 1500);
    };

    const handleCancel = () => {
        // Simple way to reset state to mock initial values on cancel (for a real app, you'd fetch initial data again)
        // For simplicity, we only reset password fields here.
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setMessage(null);
        setIsEditing(false);
    }

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
                    
                    {/* --- Personal Information Section --- */}
                    <Card className="mb-5 p-4 border-0 shadow-sm bg-light">
                        <Card.Title className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">
                            Personal Information
                        </Card.Title>
                        <Row className="mb-3">
                            <Col md={6} className="mb-3">
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
                            <Col md={6} className="mb-3">
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

                    {/* --- Password Management Section --- */}
                    <Card className="mb-5 p-4 border-0 shadow-sm bg-light">
                        <Card.Title className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">
                             Change Password
                        </Card.Title>
                        <Row className="mb-3">
                            {/* Current Password Field (Required for security) */}
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
                                    {isEditing && <Form.Text className="text-muted">Required only when changing your password.</Form.Text>}
                                </Form.Group>
                            </Col>
                            
                            {/* New Password Fields */}
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

                    {/* --- Action Buttons --- */}
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
                            <Button variant="primary" onClick={() => setIsEditing(true)} className="px-4 rounded-pill fw-bold bg-indigo-600 border-indigo-600 hover:bg-indigo-700">
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