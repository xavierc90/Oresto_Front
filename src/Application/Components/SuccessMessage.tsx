import React, { useState, useEffect } from 'react';

interface SuccessMessageProps {
  message: string;
  duration?: number; // Durée en millisecondes avant que le message ne disparaisse
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, duration = 5000 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const hideMessage = setTimeout(() => setShow(false), duration);

    return () => clearTimeout(hideMessage);
  }, [message, duration]);

  return (
    <div className={`success-message ${show ? 'show' : ''}`}>
      {message}
    </div>
  );
};
