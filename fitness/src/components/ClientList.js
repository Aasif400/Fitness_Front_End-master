import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  TextField,
} from '@mui/material';
import { format, parse } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import clientsData from './clientsData';
import UpdateIcon from '@mui/icons-material/Update';




function ClientList({ onDeleteAppointment }) {
  const [clients, setClients] = useState(clientsData);
  const [newClient, setNewClient] = useState({
    firstName: '',
    lastName: '',
    location: '',
    appointments: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);

  const handleAddClient = () => {
    setClients((prevClients) => [
      ...prevClients,
      {
        ...newClient,
        id: prevClients.length > 0 ? prevClients[prevClients.length - 1].id + 1 : 1,
      },
    ]);

    setNewClient({
      firstName: '',
      lastName: '',
      location: '',
      appointments: [],
    });
  };

  const handleDeleteClient = (clientId) => {
    setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
  };

  const handleEditClient = (clientId) => {
    const selectedClient = clients.find((client) => client.id === clientId);
    setNewClient(selectedClient);
    setIsEditing(true);
    setSelectedClientId(clientId);
  };

  const handleUpdateClient = () => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === selectedClientId ? { ...newClient, id: client.id } : client
      )
    );

    setIsEditing(false);
    setSelectedClientId(null);
    setNewClient({
      firstName: '',
      lastName: '',
      location: '',
      appointments: [],
    });
  };

  useEffect(() => {
    setClients((prevClients) => {
      
      return clientsData;
    });
  }, []);

  return (
    <div style={{ marginRight: '50px', marginLeft: '50px',marginBottom:'20px' }}>
      <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
        <TextField
          label="First Name"
          size="small"
          value={newClient.firstName}
          onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
          style={{ marginRight: '10px',   }}
        />
        <TextField
          label="Last Name"
          size="small"
          value={newClient.lastName}
          onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
          style={{ marginRight: '10px',   }}
        />
        <TextField
          label="Location"
          size="small"
          value={newClient.location}
          onChange={(e) => setNewClient({ ...newClient, location: e.target.value })}
          style={{ marginRight: '10px',   }}
        />

<LocalizationProvider dateAdapter={AdapterDayjs} >
  <DemoContainer components={['DateTimePicker']}>
    <DateTimePicker
   
      className="custom-width"
      label="Appointments"
      size="small"
      placeholder="yyyy-mm-dd hh:mm AM/PM"
      value={
        newClient.appointments.length > 0
          ? parse(newClient.appointments[0], 'MM/dd/yyyy hh:mm a', new Date())
          : null
      }
      onChange={(value) => {
        if (value && value.isValid()) {
          const formattedDateTime = format(value.toDate(), 'MM/dd/yyyy hh:mm a');
          setNewClient({
            ...newClient,
            appointments: [formattedDateTime],
          });
        } else {
          setNewClient({
            ...newClient,
            appointments: [],
          });
        }
      }}
    />
  </DemoContainer>
</LocalizationProvider>


        {isEditing ? (
          <IconButton variant="contained" color="primary" onClick={handleUpdateClient}>
            <UpdateIcon />
          </IconButton>
        ) : (
          <IconButton
            variant="contained"
            color="primary"
            onClick={handleAddClient}
            style={{ marginLeft: '10px',   }}
          >
            <AddIcon />
          </IconButton>
        )}
      </div>

      <TableContainer component={Paper} style={{ border: '10px solid darkgrey' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ border: '3px solid gray', padding: '10px' }}>ID</TableCell>
              <TableCell style={{ border: '3px solid gray', padding: '10px' }}>First Name</TableCell>
              <TableCell style={{ border: '3px solid gray', padding: '10px' }}>Last Name</TableCell>
              <TableCell style={{ border: '3px solid gray', padding: '10px' }}>Location</TableCell>
              <TableCell style={{ border: '3px solid gray', padding: '10px' }}>Appointments</TableCell>
              <TableCell style={{ border: '3px solid gray', padding: '10px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell style={{ border: '3px solid gray', padding: '10px' }}>{client.id}</TableCell>
                <TableCell style={{ border: '3px solid gray', padding: '10px' }}>{client.firstName}</TableCell>
                <TableCell style={{ border: '3px solid gray', padding: '10px' }}>{client.lastName}</TableCell>
                <TableCell style={{ border: '3px solid gray', padding: '10px' }}>{client.location}</TableCell>
                <TableCell style={{ border: '3px solid gray', padding: '10px' }}>
                  <List>
                    {client.appointments.map((appointment, index) => (
                      <div key={index}>
                        <ListItem>
                          <ListItemText primary={appointment} />
                        </ListItem>
                        {index < client.appointments.length - 1 && <Divider />}
                      </div>
                    ))}
                  </List>
                </TableCell>
                <TableCell style={{ border: '3px solid gray', padding: '10px' }}>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleEditClient(client.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    size="small"
                    onClick={() => handleDeleteClient(client.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
      );
}

export default ClientList;
