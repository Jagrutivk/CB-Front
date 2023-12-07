import React from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertComponent = ({ show, variant, onClose, message }) => {
  return (
    <Alert
      show={show}
      variant={variant}
      onClose={onClose}
      dismissible
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: variant === 'success' ? 'green' : 'red',
        color: 'white',
      }}
    >
      <Alert.Heading>{variant === 'success' ? 'Success!' : 'Error!'}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
};

export default AlertComponent;
