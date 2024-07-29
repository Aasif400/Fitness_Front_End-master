import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Calendar({ clients }) {
  
  const allAppointments = clients.reduce((acc, client) => acc.concat(client.appointments), []);

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div style={{  marginRight:'50px',marginLeft:'50px'}}>
      <h2 style={{fontSize:"30px" ,marginLeft:"610px"}}>Calendar View</h2>
      <TableContainer component={Paper} style={{ border: '10px solid darkgrey' }}>
        <Table>
          <TableHead >
            <TableRow >
              <TableCell style={{ border: '3px solid gray', padding: '10px' }}>Date</TableCell>
              <TableCell style={{ border: '3px solid gray', padding: '10px' }}>Time</TableCell>
              <TableCell style={{ border: '3px solid gray', padding: '10px' }}>Client</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {allAppointments.map((appointment, index) => (
              <TableRow key={index}>
                <TableCell style={{ border: '3px solid gray', padding: '10px' }}>{formatDateTime(appointment)}</TableCell>
                <TableCell style={{ border: '3px solid gray', padding: '10px' }}>{new Date(appointment).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                <TableCell style={{ border: '3px solid gray', padding: '10px' }}>{getClientNameOrID(appointment, clients)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Calendar;

function getClientNameOrID(appointment, clients) {
  const client = clients.find((client) => client.appointments.includes(appointment));
  
  return client ? `${client.firstName} ${client.lastName}` : 'Unknown';
}
