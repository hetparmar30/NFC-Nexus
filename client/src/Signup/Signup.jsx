import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Container, Form, FormGroup, Label, Input, Button, Title } from '../components/styles';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // State for error message
  const [loading, setLoading] = useState(false); // State for loading

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(''); // Clear previous errors

    try {
      const response = await axios.post('https://nfc-1.onrender.com/signup', formData);
      console.log(response.data);
      alert('Signup successful!');
      navigate('/login');
    } catch (error) {
      // Handle errors in a user-friendly manner
      if (error.response) {
        if (error.response.data && error.response.data.error) {
          // Customize error messages based on backend response
          setError(error.response.data.error);
        } else {
          setError('Something went wrong. Please try again.'); // Fallback error message
        }
      } else {
        setError('Network error. Please check your internet connection.'); // Network error
      }
      console.error(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <Container>
      <Title>Create Account</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input 
            type="text" 
            id="username" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </FormGroup>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        <Button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'} {/* Loading state */}
        </Button>
        <br />
        <br />
        <Button onClick={() => navigate('/login')}>Login</Button>
      </Form>
    </Container>
  );
};

export default Signup;
