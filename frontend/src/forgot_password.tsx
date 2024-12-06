import "@mantine/core/styles.css";
import { Button, Stack, Text, Box, TextInput } from "@mantine/core";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AxiosError } from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    setError('');
  
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const payload = { username: email, password: password }; // Adjust the payload format
    console.log("Payload being sent:", payload); // Debug log
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/reset_password/', payload, {
        headers: {
            //Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',  // Ensure content type is set
          }
      });
      if (response.status === 200) {
        navigate('/login');
      } else {
        setError('Password reset failed. Please try again.');
      }
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      if (axiosError.response?.data?.detail === 'User does not exist') {
        setError('This account does not exist.');
      } else {
        setError(axiosError.response?.data?.detail || 'An error occurred. Please try again.');
      }
    }
  };
  


  return (
    <div style={{
      backgroundColor: '#E0F7FA',
      minHeight: '100vh',
      height: '75vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <Box style={{
        backgroundColor: 'white',
        padding: '50px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        width: '35vw',
        height: '80vh',
      }}>
        <Stack justify="center" align="center">
          <Text size='xl' fw={700} style={{ color: '#0097A7', fontSize: '45px', fontFamily: 'Holtwood One SC, serif' }}>
            PassTime
          </Text>
          <Text size="xl" fw={700} style={{ textDecoration: 'underline' }}>
            Reset Password
          </Text>
          {error && <Text style={{ color: 'red', marginBottom: '-13px' }}>{error}</Text>}
          <TextInput
            label="Username"
            placeholder="Enter Username"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            required
            style={{ width: '65%' }}
          />
          <TextInput
            label="Password"
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            required
            style={{ width: '65%' }}
          />
          <Button
            style={{
              width: 'auto',
              backgroundColor: '#4B0082',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onClick={handleResetPassword}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0097A7')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4B0082')}
          >
            Reset Password
          </Button>
        </Stack>
      </Box>
    </div>
  );

}

