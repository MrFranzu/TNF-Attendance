import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const EventForm = () => {
  const [aname, setAname] = useState('');
  const [numPeople, setNumPeople] = useState('');
  const [eventCode, setEventCode] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!aname || !numPeople || !eventCode) {
      setErrorMessage('All fields are required.');
      return;
    }

    const qrData = JSON.stringify({
      eventCode,
      name: aname,
      numPeople: parseInt(numPeople, 10),
    });

    setQrCode(qrData); // Generate QR code for display
    setErrorMessage('');
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
    color: '#6A1B9A', // Violet color
    fontSize: '2.5rem',
    marginBottom: '40px',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '40px', // Add space between form and QR code
    flexDirection: 'row', // Default to row on larger screens
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flex: '1', // Take up remaining space
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
    backgroundColor: '#F3E5F5', // Light violet
    color: '#4A148C', // Dark violet
    outline: 'none',
  },
  button: {
    padding: '15px',
    background: '#8E24AA', // Darker violet
    color: '#fff',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.2rem',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    background: '#6A1B9A', // Even darker violet on hover
  },
  error: {
    color: '#D32F2F', // Red error color
    fontSize: '1rem',
    textAlign: 'center',
  },
  qrContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '0 1 300px', // Limit QR code container size
    height: '100%',
    flexDirection: 'column', // Stack the QR code and instruction text
    alignItems: 'center',
  },
  qrInstruction: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#4A148C', // Dark violet
    marginBottom: '15px', // Space between the instruction and QR code
    textAlign: 'center',
  },
  // Media queries for responsiveness
  '@media (max-width: 768px)': {
    container: {
      padding: '20px',
    },
    header: {
      fontSize: '2rem',
      marginBottom: '20px',
    },
    formContainer: {
      flexDirection: 'column', // Stack form and QR on smaller screens
      gap: '20px', // Adjust gap
    },
    form: {
      padding: '20px',
    },
    input: {
      fontSize: '1rem',
      padding: '12px',
    },
    button: {
      fontSize: '1rem',
      padding: '12px',
    },
    qrContainer: {
      flex: '1 1 100%', // QR code container takes full width
      justifyContent: 'center',
    },
    qrInstruction: {
      fontSize: '1rem',
    },
  },

  '@media (max-width: 480px)': {
    header: {
      fontSize: '1.6rem',
    },
    input: {
      fontSize: '0.9rem',
      padding: '10px',
    },
    button: {
      fontSize: '1rem',
      padding: '10px',
    },
    qrInstruction: {
      fontSize: '0.9rem',
    },
  },
};

export default EventForm;
