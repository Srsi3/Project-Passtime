import "@mantine/core/styles.css";
import { Button, Stack, Group, Text, Box, TextInput } from "@mantine/core";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

export default function CreateAccount() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async () => {
        setError('');  // Reset error
        setSuccess(false);  // Reset success

        // Basic validation
        if (!fullName || !email || !password || !confirmPassword) {
          setError('Please fill in all fields.');
          return;
        }

        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setError('Please enter a valid email.');
          return;
        }

        // Make the registration API request using Axios
        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/registration/', {
                username: fullName,  
                email: email,
                password1: password,
                password2: confirmPassword,
            });

            console.log("Navigating to login 1.")

            if (response.status === 204) {  // Created
                // Registration successful
                setSuccess(true);
                setFullName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                console.log("Navigating to login 2")
                //const token = response.data.token;
                //localStorage.setItem('authToken', token);
                navigate('/login');

            } 
            
        } catch (err) {
          const axiosError = err as AxiosError<any>;
          console.log('Error response:', axiosError.response); // Log the entire response for debugging
          if (axiosError.response?.data) {
              setError(axiosError.response?.data?.detail || 'Registration failed. Please try again.');
          } else {
              setError('An error occurred. Please try again.');
          }
        }
    };

    return (
        <div
            style={{
                backgroundColor: '#E0F7FA',
                minHeight: '100vh',
                height: '75vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            <Box
                style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    width: '35vw',
                    height: '80vh',
                }}
            >
                <Stack justify="center" align="center">
                    <Text size='xl' fw={700} style={{ color: '#0097A7', fontSize: '45px', fontFamily: 'Holtwood One SC, serif', marginBottom: '-15px' }}>
                        PassTime
                    </Text>
                    <Text size="xl" fw={700} style={{ textDecoration: 'underline', marginBottom: '-7px' }}>
                        Create Account
                    </Text>
                    {error && (
                        <Text style={{ color: 'red', marginBottom: '-13px' }}>{error}</Text>
                    )}
                    {success && (
                        <Text style={{ color: 'green', marginBottom: '-13px' }}>Registration successful! You can now <Link to="/login">login</Link>.</Text>
                    )}
                    <TextInput
                        label="Username"
                        placeholder="Enter Username"
                        type="text"
                        value={fullName}
                        onChange={(event) => setFullName(event.currentTarget.value)}
                        required
                        style={{ width: '65%', marginBottom: '-8px' }}
                    />
                    <TextInput
                        label="Email"
                        placeholder="Enter Email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.currentTarget.value)}
                        required
                        style={{ width: '65%', marginBottom: '-8px' }}
                    />
                    <TextInput
                        label="Password"
                        placeholder="Enter Password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                        required
                        style={{ width: '65%', marginBottom: '-8px' }}
                    />
                    <TextInput
                        label="Confirm Password"
                        placeholder="Enter Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.currentTarget.value)}
                        required
                        style={{ width: '65%', marginBottom: '10px' }}
                    />
                    <Button
                        styles={(theme) => ({
                            root: {
                                width: '15%',
                                backgroundColor: '#4B0082',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#0097A7',
                                },
                            },
                        })}
                        onClick={handleSubmit}
                    >
                        Join
                    </Button>
                    <Group style={{ gap: '5px' }}>
                        <Text>
                            Already have an account?
                        </Text>
                        <Link to="/Login" style={{ textDecoration: 'none' }}>
                            <Text
                                style={{
                                    textDecoration: 'underline',
                                    color: '#42A5F5',
                                    cursor: 'pointer',
                                    transition: 'color 0.3s ease',
                                }}
                            >
                                Sign in
                            </Text>
                        </Link>
                    </Group>
                </Stack>
            </Box>
        </div>
    )
}
