import "@mantine/core/styles.css";
import React from 'react';
import "@mantine/core/styles.css";
import { Button, Stack } from "@mantine/core";
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {Text} from '@mantine/core';
import { Box } from '@mantine/core';
import {createTheme} from '@mantine/core';
import { TextInput } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Container, Group, Burger } from '@mantine/core';
import { Center, Anchor} from '@mantine/core';
import { Flex } from '@mantine/core';

const theme = createTheme({
    primaryColor: 'custom-teal',
    colors: {
      // Define shades of teal
      'custom-teal': [
        '#E0F7FA', // shade 0: very light teal
        '#B2EBF2', // shade 1: light teal
        '#80DEEA', // shade 2: lighter teal
        '#4DD0E1', // shade 3: light-medium teal
        '#26C6DA', // shade 4: medium teal
        '#00BCD4', // shade 5: base teal (primary shade)
        '#00ACC1', // shade 6: slightly darker teal
        '#0097A7', // shade 7: dark teal
        '#00838F', // shade 8: darker teal
        '#006064', // shade 9: very dark teal
        '#FEF7FF', // shade 10: light purple (background color)
      ],
    },
  });
  


export default function StudentRequest(){
    const [location, setLocation] = useState('');
    const [cancelRequest, setcancelRequest] = useState(false);
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const handlePassRequest = (location: string) => {
        console.log(`Pass requsted to: ${location}`); // displays location clicked
        setcancelRequest(true);
    };

    const handleCancelRequest = (status: boolean) => {
        setcancelRequest(false);
    }

    return(
        <div style={{
            backgroundColor: '#FEF7FF', 
            minHeight: '100vh',
            height: '75vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            flexDirection: 'column'}}>

        <Stack justify="flex-start" align="flex-start" style={{ width: '100%', paddingLeft: '20px' }}>
        <Text size='xl' fw={700} style={{color: 'black', fontSize: '16px'}}>
            {date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}
        <Text size='xl' fw={700} style={{color: '#0097A7', fontSize: '40px', fontFamily: 'Holtwood One SC, serif'}}>
            PassTime
        </Text>
        <Text size='xl' fw={700} style={{color: 'black', fontSize: '24px'}}>
            Hall Pass Request
        </Text>
        </Text>
        </Stack>
    
        <Box
          style={{
            backgroundColor: '#E0F7FA',  
            padding: '50px',            
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            borderRadius: '10px',       
            width: '80vw',              
            height: '60vh',             
          }}>
            <Stack justify = "center" align="left">
            <Text size='xl' fw={700} style={{color: 'black', fontSize: '16px'}}> 
                WINSTON BISHOP
            <Text size='xl' fw={700} style={{color: 'gray', fontSize: '16px'}}>
                English 1
            <Text size='xl' fw={700} style={{color: 'black', fontSize: '24px'}}>
                Where do you need to go?
            </Text>
            </Text>
            </Text>
            </Stack>
            
            <Stack justify = "center" align="center">
            <Group justify = "center" align="center" style={{ gap: '20px', marginTop: '40px' }}>
            {['Bathroom', 'Office', 'Nurse', 'Library'].map((loc) => (
                <Button
                    key={loc} variant="filled" color="#0097A7" size="lg" radius="xl"
                    onClick={() => setLocation(loc)}
                    style={{
                        opacity: location && location !== loc ? 0.5 : 1, // Fades other buttons
                        transition: 'opacity 0.3s ease' // Smooth transition
                    }}
                    // set disabled when location !== loc and request IS canceled
                    disabled={location!= loc && cancelRequest}
                >
                    {loc}
                </Button>
            ))}
            </Group>
            
            <Button variant="filled" color="#65558F" size="md" style={{width: '200px'}} disabled={cancelRequest} onClick={() => handlePassRequest(location)} > Submit Request
            </Button>
            <Button variant="filled" color="#65558F" size="md" style={{width: '200px'}} disabled={!cancelRequest} onClick={() => handleCancelRequest(true)}> Cancel Request
            </Button>
            </Stack>
          </Box>

                
        
       </div> 
    )

}