import "@mantine/core/styles.css";
import { Button, Stack, Group, Text, Box, TextInput, Title } from "@mantine/core";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

export default function HomePage() {
    const [location, setLocation] = useState('');
    const date = new Date();

    return (
        <div 
            style={{
                backgroundColor:'#E0F7FA',
                minHeight:'100vh',
                display:'flex',
                justifyContent:'flex-start',
                alignItems:'flex-end',
                flexDirection:'column'
            }}
        >
        <Stack justify="flex-start" align="flex-start" style={{ width: '100%', paddingLeft: '30px', paddingTop: '20px' }}>
        <Text size='xl' fw={700} style={{ color: 'black', fontSize: '16px' }}>
                    {date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}
                </Text>

                <Text size='xl' fw={700} style={{color: '#0097A7', fontSize: '40px', fontFamily: 'Holtwood One SC, serif' }}>
                    PassTime
                </Text>
              
                <Text size='xl' fw={700} style={{color: 'black', fontSize: '16px'}}> 
                WINSTON BISHOP
                
                <Text size='xl' fw={700} style={{color: 'gray', fontSize: '16px'}}> 
                English 1   
                </Text>
                </Text>


                <Title order={2} style={{ color:'#000000', marginBottom: '1px', fontFamly:'Roboto' }}>
                    Student Requests
                </Title>

                <Group justify="center">
    
                    <Button style={{ backgroundColor: '#808080', color: 'white', width: '150px', height: '150px' }}>
                        {/*placehold*/}
                        Person 1
                    </Button>
                    <Button style={{ backgroundColor: '#808080', color: 'white', width: '150px', height: '150px' }}>
                        {/* placehold*/}
                        Person 2
                    </Button>
                    <Button style={{ backgroundColor: '#808080', color: 'white', width: '150px', height: '150px' }}>
                        {/*placehold*/}
                        Person 3
                    </Button>
                </Group>



                <Title order={2} style={{color:'#000000', marginBottom: '1px', marginTop:'30px', fontFamly:'Roboto' }}>
                    Approved Requests
                </Title>

                <Group justify="center">
    
                    <Button style={{ backgroundColor: '#808080', color: 'white', width: '150px', height: '150px' }}>
                        {/*placehold*/}
                        Person 1
                    </Button>
                    <Button style={{ backgroundColor: '#808080', color: 'white', width: '150px', height: '150px' }}>
                        {/* placehold */}
                        Person 2
                    </Button>

                </Group>



            </Stack>


        </div>
    );
}
