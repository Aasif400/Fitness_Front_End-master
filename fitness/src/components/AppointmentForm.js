import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function AppointmentForm({ client }) {
  const [newAppointment, setNewAppointment] = useState('');
  const [appointments, setAppointments] = useState(client.appointments);

  const handleAddAppointment = () => {
    if (newAppointment) {
      setAppointments([...appointments, newAppointment]);
      setNewAppointment('');
    }
  };

  const handleEditAppointment = (index, newDateTime) => {
    const updatedAppointments = [...appointments];
    updatedAppointments[index] = newDateTime;
    setAppointments(updatedAppointments);
  };
  

  const handleDeleteAppointment = (index) => {
    const updatedAppointments = [...appointments];
    updatedAppointments.splice(index, 1);
    setAppointments(updatedAppointments);
  };

  return (
    <div>
      <input
        type="datetime-local"
        value={newAppointment}
        onChange={(e) => setNewAppointment(e.target.value)}
      />
      <IconButton onClick={handleAddAppointment} color="primary">
        <AddCircleIcon />
      </IconButton>
      
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index}>
            {appointment}{' '}
            <IconButton onClick={() => handleEditAppointment(index, 'newDateTime')} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteAppointment(index)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentForm;
