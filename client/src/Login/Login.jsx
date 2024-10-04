import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, FormGroup, Label, Input, Button, Title } from '../components/styles';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const response = await axios.post('https://nfc-1.onrender.com/login', formData);
      Cookies.set('token-auth', response.data.token, { expires: 7, secure: true });
      alert('Login successful!');
      navigate('/'); // Redirect to home page
    } catch (error) {
      if (error.response) {
        // Display specific error messages
        setError(error.response.data.error || 'Something went wrong. Please try again.');
      } else {
        setError('Network error. Please check your internet connection.'); // Network error
      }
      console.error('There was an error logging in!', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
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
          {loading ? 'Logging In...' : 'Login'} {/* Loading state */}
        </Button>
        <br />
        <br />
        <Button onClick={() => navigate('/signup')}>Signup</Button>
      </Form>
    </Container>
  );
};

export default Login;
