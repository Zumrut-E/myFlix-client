import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import axios from 'axios';

export const UserForm = ({ user, onUserUpdate, onLoggedOut }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  const handleUpdate = () => {
    const updatedUser = {
      username: username,
      ...(password && { Password: password }),
      email: email,
      birthday: birthday,
    };

    axios.put(`/users/${user.username}`, updatedUser, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        alert('Profile updated successfully');
        onUserUpdate(response.data);
      })
      .catch(error => console.error('There was an error updating your profile', error));
  };

  const handleDeregister = () => {
    axios.delete(`/users/${user.username}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(() => {
        alert('Your account has been deleted');
        onLoggedOut();
      })
      .catch(error => console.error('There was an error deleting your account', error));
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Edit Profile</Card.Title>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="mb-3"
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="mb-3"
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mb-3"
            />
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              value={birthday ? new Date(birthday).toISOString().substr(0, 10) : ''}
              onChange={e => setBirthday(e.target.value)}
              className="mb-3"
            />
          </Form.Group>

          <Button variant="primary" onClick={handleUpdate} className="me-2">
            Update Profile
          </Button>
          <Button variant="danger" onClick={handleDeregister}>
            Deregister
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};


