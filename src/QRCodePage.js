import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const QRCodePage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook to navigate to the previous page
  const { qrData } = location.state || {};  // Retrieve qrData from state passed by navigate()

  // If qrData is not available, show a fallback message
  if (!qrData) {
    return <p>No QR data available.</p>;
  }

  // Inline styles for violet and white color palette
  const styles = {
    pageContainer: {
      backgroundColor: 'white',
      color: 'violet',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      flexDirection: 'column',
      padding: '20px',
    },
    contentContainer: {
      textAlign: 'center',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'violet',
      color: 'white',
      width: '100%',
      maxWidth: '600px',
    },
    heading: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: 'white',
    },
    paragraph: {
      fontSize: '16px',
      marginBottom: '20px',
      color: 'white',
    },
    qrCodeContainer: {
      marginBottom: '20px',
    },
    button: {
      backgroundColor: 'white',
      color: 'violet',
      border: '2px solid violet',
      padding: '12px 24px',
      fontSize: '18px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
      textDecoration: 'none',
      marginTop: '20px',
      fontWeight: 'bold',
      width: '200px', // Increased width for better touch targets
    },
    buttonHover: {
      backgroundColor: 'violet',
      color: 'white',
      transform: 'scale(1.05)', // Slight scale effect for hover interaction
    },
    buttonActive: {
      backgroundColor: 'violet',
      color: 'white',
      transform: 'scale(0.95)', // Scale down slightly for active click
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentContainer}>
        <h1 style={styles.heading}>Your Event QR Code</h1>
        <p style={styles.paragraph}>
          <strong>Kindly take a screenshot</strong> or take a <strong>photo</strong> of it.
        </p>
        
        {/* QR Code Container */}
        <div style={styles.qrCodeContainer}>
          <QRCodeSVG value={qrData} size={256} />
        </div>
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={styles.button}
          onMouseOver={(e) => e.target.style = styles.buttonHover}
          onMouseOut={(e) => e.target.style = styles.button}
          onMouseDown={(e) => e.target.style = styles.buttonActive} // Active state when clicked
          onMouseUp={(e) => e.target.style = styles.buttonHover} // Return to hover state after release
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default QRCodePage;
