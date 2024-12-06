import "@mantine/core/styles.css";
import { Button, Stack, Group, Text, Box, Title } from "@mantine/core";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from 'axios';

// Define the shape of a hall pass request
interface HallPassRequestData {
  id: number;
  student: string;      // e.g. "lazzy"
  request_type: string; // e.g. "office", "bathroom", etc.
  reason: string | null;
  status: string;       // "pending", "approved", or "rejected"
}

export default function HomePage() {
  const [requests, setRequests] = useState<HallPassRequestData[]>([]);
  const [location, setLocation] = useState('');
  const date = new Date();
  const navigate = useNavigate(); // Initialize the navigation hook

  // Fetch all hall pass requests on mount
  useEffect(() => {
    axios.get<HallPassRequestData[]>('http://127.0.0.1:8000/hallpass-requests/')
      .then(response => {
        setRequests(response.data);
      })
      .catch((error: AxiosError) => {
        console.error('Error fetching requests:', error.response);
      });
  }, []);

  // Separate requests by status
  const pendingRequests = requests.filter(req => req.status === 'pending');
  const approvedRequests = requests.filter(req => req.status === 'approved');
  // Rejected requests are not displayed

  const handleApprove = (id: number) => {
    axios.post(`http://127.0.0.1:8000/hallpass-requests/${id}/approve/`)
      .then(response => {
        console.log('Approved:', response.data);
        // Update the request in the local state
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r));
      })
      .catch((error: AxiosError) => {
        console.error('Error approving:', error.response);
      });
  };

  const handleReject = (id: number) => {
    axios.post(`http://127.0.0.1:8000/hallpass-requests/${id}/reject/`)
      .then(response => {
        console.log('Rejected:', response.data);
        // Update the request in the local state
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
      })
      .catch((error: AxiosError) => {
        console.error('Error rejecting:', error.response);
      });
  };

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing auth tokens, etc.)
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div
      style={{
        backgroundColor: '#E0F7FA',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      {/* Top Bar */}
      <Box
        style={{
          width: '100%',
          backgroundColor: '#0097A7',
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <Text style={{ color: 'white', fontSize: '20px', fontFamily: 'Holtwood One SC, serif' }}>PassTime</Text>
        <Group style={{ gap: '16px' }}>
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <Button variant="subtle" style={{ color: 'white' }}>Profile</Button>
          </Link>

          <Link to="/settings" style={{ textDecoration: 'none' }}>
            <Button variant="subtle" style={{ color: 'white' }}>Settings</Button>
          </Link>

          <Button
            variant="subtle"
            style={{ color: 'white' }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Group>
      </Box>

      {/* Page Content */}
      <Stack justify="flex-start" align="flex-start" style={{ width: '100%', paddingLeft: '30px', paddingTop: '80px' }}>
        <Text size="xl" fw={700} style={{ color: 'black', fontSize: '16px' }}>
          {date.toLocaleDateString('en-us', {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>

        <Text size="xl" fw={700} style={{ color: '#0097A7', fontSize: '40px', fontFamily: 'Holtwood One SC, serif' }}>
          PassTime
        </Text>

        {/* <Text size="xl" fw={700} style={{ color: 'black', fontSize: '16px' }}>
          WINSTON BISHOP
          <Text size="xl" fw={700} style={{ color: 'gray', fontSize: '16px' }}>
            English 1
          </Text>
        </Text> */}

        {/* Pending Requests Section */}
        <Title order={2} style={{ color: '#000000', marginBottom: '1px', fontFamily: 'Roboto' }}>
          Student Requests
        </Title>
        <Group justify="center" mt={10} style={{ flexWrap: 'wrap', gap: '20px' }}>
          {pendingRequests.map(req => (
            <div key={req.id} style={{
              backgroundColor: '#808080',
              color: 'white',
              width: '150px',
              height: '150px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '8px'
            }}>
              <Text size='md' fw={700}>{req.student}</Text>
              <Text size='sm'>{req.request_type}</Text>
              {/* <Text size='sm'>{req.reason || 'No reason'}</Text> */}
              <Group justify="center" mt={10}>
                <Button size="xs" onClick={() => handleApprove(req.id)} style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                  Approve
                </Button>
                <Button size="xs" onClick={() => handleReject(req.id)} style={{ backgroundColor: '#F44336', color: 'white' }}>
                  Reject
                </Button>
              </Group>
            </div>
          ))}
          {pendingRequests.length === 0 && (
            <Text size='sm' style={{ color: 'black' }}>No pending requests</Text>
          )}
        </Group>

        {/* Approved Requests Section */}
        <Title order={2} style={{ color: '#000000', marginBottom: '1px', marginTop: '30px', fontFamily: 'Roboto' }}>
          Approved Requests
        </Title>
        <Group justify="center" mt={10} style={{ flexWrap: 'wrap', gap: '20px' }}>
          {approvedRequests.map(req => (
            <div key={req.id} style={{
              backgroundColor: '#808080',
              color: 'white',
              width: '150px',
              height: '150px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '8px'
            }}>
              <Text size='md' fw={700}>{req.student}</Text>
              <Text size='sm'>{req.request_type}</Text>
              <Text size='sm'>{req.reason || 'No reason'}</Text>
            </div>
          ))}
          {approvedRequests.length === 0 && (
            <Text size='sm' style={{ color: 'black' }}>No approved requests</Text>
          )}
        </Group>
      </Stack>
    </div>
  );
}
