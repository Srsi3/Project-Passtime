import "@mantine/core/styles.css";
import { Button, Stack } from "@mantine/core";
import { useState } from 'react';
import { Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {Text} from '@mantine/core';
import { Box } from '@mantine/core';
import {createTheme} from '@mantine/core';
import { TextInput } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function CreateAccount(){
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

 
    const handleSubmit = () => {
        // Reset the error state before validation
        setError('');
    
        // Simple validation example
        if (!fullName || !email || !password || !confirmPassword) {
          setError('Please fill in all fields.');
          return;
        }
    
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          return;
        }
    
        // If validation passes, clear the error and proceed with form submission
        setError('');
        // Simulate form submission or further processing
        console.log('Form Submitted:', { fullName, email, password });
      };
    

    return(
        <div
        style={{
        backgroundColor: '#E0F7FA', 
        minHeight: '100vh',
        height: '75vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column'}}>
        <Box
          style={{
            backgroundColor: 'white',  
            padding: '20px',            
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            borderRadius: '10px',       
            width: '35vw',              
            height: '80vh',             
          }}>
            <Stack justify="center" align="center" >
            <Text size='xl' fw={700} style={{color: '#0097A7', fontSize: '45px', fontFamily: 'Holtwood One SC, serif', marginBottom: '-15px'}}>
                PassTime
            </Text>
            <Text size="xl" fw={700} style={{ textDecoration: 'underline', marginBottom:'-7px' }}>
                Create Account
            </Text>
            {error && (
            <Text style={{ color: 'red', marginBottom: '-13px' }}>{error}</Text>
          )}
            <TextInput
            label="Full Name"
            placeholder="Enter Full Name"
            type="email"
            value={fullName}
            onChange={(event) => setFullName(event.currentTarget.value)}
            required
            style={{width:'65%', marginBottom: '-8px'}} 
            />
            <TextInput
            label="Email"
            placeholder="Enter Email"
            type="email"
            onChange={(event) => setEmail(event.currentTarget.value)}
            required
            style={{width:'65%', marginBottom: '-8px'}} 
            />
            <TextInput
            label="Password"
            placeholder="Enter Password"
            type="password"
            onChange={(event) => setPassword(event.currentTarget.value)}
            required
            style={{width:'65%', marginBottom: '-8px'}}
            />
            <TextInput
            label="Confirm Password"
            placeholder="Enter Password"
            type="password"
            onChange={(event) => setConfirmPassword(event.currentTarget.value)}
            required
            style={{width:'65%', marginBottom: '10px'}}
            />
            <Button style={{width: '15%',
                backgroundColor: '#4B0082',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                }}  
                onClick={handleSubmit}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0097A7')} // Hover color
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4B0082')} // Revert color
                >
                Join
            </Button>
            <Group style={{ gap: '5px' }}>
                <Text>
                    Already have an account?
                </Text>
                <Link to="/Login" style={{ textDecoration: 'none' }}>
                <Text style={{textDecoration: 'underline', 
                        color:'#42A5F5',
                        cursor: 'pointer',
                        transition: 'color 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#4B0082')} // Hover color
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#42A5F5')}
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