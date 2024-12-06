import "@mantine/core/styles.css";
import React, { useState } from 'react';
import { Button, Stack, Text, Box, Group, createTheme, TextInput } from "@mantine/core";
import { Link } from 'react-router-dom';
import { Container, Burger, Center, Anchor, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';  // Import Axios

const theme = createTheme({
  primaryColor: 'custom-teal',
  colors: {
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

export default function StudentRequest() {
  const [location, setLocation] = useState<string>('');
  const [cancelRequest, setcancelRequest] = useState(false);
  const date = new Date();

  // This is a placeholder student ID. Replace with the actual student's ID.
  const studentId = 1; 

  const handlePassRequest = async (loc: string) => {
    if (!loc) {
      console.log("No location selected");
      return;
    }

    // Convert the chosen location to a format the backend expects
    // For example, if backend expects lowercase request_types like 'bathroom', 'office', 'nurse', 'library'
    const requestType = loc.toLowerCase();

    try {
      const response = await axios.post('http://127.0.0.1:8000/hallpass-requests/', {
        student: studentId,
        request_type: requestType,
        reason: "",   
        status: "pending"
      });

      console.log("Request submitted successfully:", response.data);
      setcancelRequest(true); // The user can now cancel the request if desired
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  const handleCancelRequest = (status: boolean) => {
    setcancelRequest(false);
    setLocation(''); // reset location if cancelled
  };

  return (
    <div style={{
      backgroundColor: '#FEF7FF',
      minHeight: '100vh',
      height: '75vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>

      <Stack justify="flex-start" align="flex-start" style={{ width: '100%', paddingLeft: '20px' }}>
        <Text size='xl' fw={700} style={{ color: 'black', fontSize: '16px' }}>
          {date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}
          <Text size='xl' fw={700} style={{ color: '#0097A7', fontSize: '40px', fontFamily: 'Holtwood One SC, serif' }}>
            PassTime
          </Text>
          <Text size='xl' fw={700} style={{ color: 'black', fontSize: '24px' }}>
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
        }}
      >
        <Stack justify="center" align="left">
          <Text size='xl' fw={700} style={{ color: 'black', fontSize: '16px' }}>
            WINSTON BISHOP
            <Text size='xl' fw={700} style={{ color: 'gray', fontSize: '16px' }}>
              English 1
              <Text size='xl' fw={700} style={{ color: 'black', fontSize: '24px' }}>
                Where do you need to go?
              </Text>
            </Text>
          </Text>
        </Stack>

        <Stack justify="center" align="center">
          <Group justify="center" align="center" style={{ gap: '20px', marginTop: '40px' }}>
            {['Bathroom', 'Office', 'Nurse', 'Library'].map((loc) => (
              <Button
                key={loc} variant="filled" color="#0097A7" size="lg" radius="xl"
                onClick={() => setLocation(loc)}
                style={{
                  opacity: location && location !== loc ? 0.5 : 1,
                  transition: 'opacity 0.3s ease'
                }}
                disabled={location !== loc && cancelRequest}
              >
                {loc}
              </Button>
            ))}
          </Group>

          <Button
            variant="filled"
            color="#65558F"
            size="md"
            style={{ width: '200px', marginTop: '20px' }}
            disabled={cancelRequest || !location}
            onClick={() => handlePassRequest(location)}
          >
            Submit Request
          </Button>

          {/* <Button
            variant="filled"
            color="#65558F"
            size="md"
            style={{ width: '200px', marginTop: '10px' }}
            disabled={!cancelRequest}
            onClick={() => handleCancelRequest(true)}
          >
            Cancel Request
          </Button> */}
        </Stack>
      </Box>
    </div>
  );
}
