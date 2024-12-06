import "@mantine/core/styles.css";
import { Button, Stack, Group, Text, Box, TextInput } from "@mantine/core";
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AxiosError } from 'axios';

export default function LoginPage() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async () => {
    console.log('Email:', email);
    console.log('Password:', password);

    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/login/', {
        username: email,
        password: password,
      });
      console.log('API response:', response);

      const token = response.data.key;
      sessionStorage.setItem('authToken', token);  
      console.log('Token saved:', sessionStorage.getItem('authToken'));
      console.log('Token from response:', token);
      //console.log('Token saved:', localStorage.getItem('authToken'));  // Log the saved token


      if (token) {
          sessionStorage.setItem('authToken', token);  
          console.log('Token saved:', sessionStorage.getItem('authToken'));
    } else {
        console.error('Token not found in response.');
    }


      if (response.status === 200) {  // OK
        // Login successful
        console.log('Login successful:', response.data);

        // Store authentication token if provided
        const token = response.data.token;
        localStorage.setItem('authToken', response.data.token);
        console.log('Token saved:', sessionStorage.getItem('authToken')); // Should log the token

        // Redirect to a protected route or dashboard
        navigate('/home');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      console.log('Error response:', axiosError.response); // Log the entire response for debugging
      if (axiosError.response?.data) {
        setError(axiosError.response?.data?.detail || 'Login failed. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleForgetPasswordClick = () => {
    navigate("/forgotpassword");
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
      <Box
        style={{
          backgroundColor: 'white',
          padding: '50px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          width: '35vw',
          height: '80vh',
        }}>
        <Stack justify="center" align="center" >
          <Text size='xl' fw={700} style={{ color: '#0097A7', fontSize: '45px', fontFamily: 'Holtwood One SC, serif' }}>
            PassTime
          </Text>
          <Text size="xl" fw={700} style={{ textDecoration: 'underline' }}>
            Sign In
          </Text>
          {error && (
            <Text style={{ color: 'red', marginBottom: '-13px' }}>{error}</Text>
          )}
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
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '65%' }}>
            <Text style={{
              color: '#42A5F5',
              textDecoration: 'underline',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#4B0082')} // Hover color
              onMouseLeave={(e) => (e.currentTarget.style.color = '#42A5F5')} // Revert color
              onClick={handleForgetPasswordClick}
            >
              Forgot Password?
            </Text>
          </div>
          <Button style={{
            width: '18%',
            backgroundColor: '#4B0082',
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
            onClick={handleLogin}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0097A7')} // Hover color
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4B0082')} // Revert color
          >
            Login
          </Button>
          <Group style={{ gap: '5px' }}>
            <Text>
              New to PassTime?
            </Text>
            <Link to="/createaccount" style={{ textDecoration: 'none' }}>
              <Text style={{
                textDecoration: 'underline',
                color: '#42A5F5',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#4B0082')} // Hover color
                onMouseLeave={(e) => (e.currentTarget.style.color = '#42A5F5')}
              >
                Create an account
              </Text>
            </Link>
          </Group>
        </Stack>
      </Box>
    </div>
  )
}
