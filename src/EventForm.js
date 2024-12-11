import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const EventForm = () => {
  const [aname, setAname] = useState('');
  const [numPeople, setNumPeople] = useState('');
  const [eventCode, setEventCode] = useState('');
  const [attendees, setAttendees] = useState([]);
  const [qrCode, setQrCode] = useState('');  
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddAttendee = () => {
    if (!aname || !numPeople) {
      setErrorMessage('Name and number of people are required.');
      return;
    }

    const newAttendee = {
      name: aname,
      numPeople: parseInt(numPeople, 10),
    };

    setAttendees([...attendees, newAttendee]);
    setAname('');
    setNumPeople('');
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!eventCode || attendees.length === 0) {
      setErrorMessage('Event code and at least one attendee are required.');
      return;
    }
  
    const totalPeople = attendees.reduce((sum, attendee) => sum + attendee.numPeople, 0);
    const qrData = JSON.stringify({
      eventCode,
      attendees,
      totalPeople,
    });
  
    setErrorMessage('');
    setAttendees([]); 
    setEventCode('');
    setQrCode(qrData); 
  };
  

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>TNF Attendance</h1>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={aname}
            onChange={(e) => setAname(e.target.value)}
            placeholder="Name (e.g. Juan Cruz, Reyes Family)"
            style={styles.input}
          />
          <input
            type="number"
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
            placeholder="Enter number of people"
            style={styles.input}
          />
          <button
            type="button"
            onClick={handleAddAttendee}
            style={styles.button}
          >
            Add Attendee
          </button>
          <input
            type="text"
            value={eventCode}
            onChange={(e) => setEventCode(e.target.value)}
            placeholder="Enter event code"
            style={styles.input}
          />
          {errorMessage && <p style={styles.error}>{errorMessage}</p>}
          <button type="submit" style={styles.button}>
            Generate QR Code
          </button>
        </form>

        <div style={styles.attendeesList}>
          {attendees.length > 0 && (
            <ul style={styles.list}>
              {attendees.map((attendee, index) => (
                <li key={index} style={styles.listItem}>
                  {attendee.name} - {attendee.numPeople} people
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={styles.qrContainer}>
          {qrCode && (
            <>
              <p style={styles.qrInstruction}>
                Kindly take a <strong>screenshot</strong> or take a{' '}
                <strong>photo</strong> of it.
              </p>
              <QRCodeCanvas value={qrCode} size={250} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    maxWidth: '1000px',
    margin: 'auto',
    backgroundColor: '#F9F9F9',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    color: '#6A1B9A', 
    fontSize: '2.5rem',
    marginBottom: '40px',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '40px', 
    flexDirection: 'row',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flex: '1',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  input: {
    padding: '15px',
    fontSize: '1.2rem',
    border: '1px solid #DDD',
    borderRadius: '4px',
    backgroundColor: '#F3E5F5', 
    color: '#4A148C',
    outline: 'none',
  },
  button: {
    padding: '15px',
    background: '#8E24AA', 
    color: '#fff',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.2rem',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: '#D32F2F', 
    fontSize: '1rem',
    textAlign: 'center',
  },
  qrContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '0 1 300px',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  qrInstruction: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#4A148C', 
    marginBottom: '15px',
    textAlign: 'center',
  },
  attendeesList: {
    marginTop: '20px',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  listItem: {
    fontSize: '1.1rem',
    color: '#4A148C',
  },
};

export default EventForm;
