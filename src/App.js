import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // useNavigate hook added
import EventForm from './EventForm'; // Import your EventForm (Event Attendance)
import QRCodePage from './QRCodePage'; // Import your QRCodePage component

function App() {
  const navigate = useNavigate();

  // Automatically navigate to EventForm ("/") when the page is refreshed
  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate('/'); // Navigate to the EventForm page
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<EventForm />} />  {/* Event Attendance (EventForm) */}
      <Route path="/qr-code" element={<QRCodePage />} />  {/* QRCodePage */}
    </Routes>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
