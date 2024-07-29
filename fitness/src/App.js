import React, { useState } from 'react';
import ClientList from './components/ClientList';
import Calendar from './components/Calendar';
import IconButton from '@mui/material/IconButton';
import EventIcon from '@mui/icons-material/Event';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import clients from './components/clientsData'; 


function App() {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Box  display="flex"
  alignItems="center"
  justifyContent="center"
  flexDirection="row">
      <h1 style={{fontSize:'60px'}} ><i>Fitness Trainer App</i></h1>
      </Box>
      <Box  display="flex"
  alignItems="center"
  justifyContent="center"
  flexDirection="row" 
   mb={10} >
        <Typography variant="h5" style={{ marginRight: '8px' }}>
          Show Calendar:
        </Typography>
        <IconButton style={{backgroundColor:'white'}} onClick={() => setShowCalendar(!showCalendar)}>
          <EventIcon />
        </IconButton>
      </Box>
      {showCalendar ? <Calendar clients={clients} /> : <ClientList clients={clients} />}
    </div>
  );
}

export default App;
