import React, { useEffect, useState } from 'react';

interface NotificationMessageProps {
  message: string | null;
  type: 'success' | 'error';
  duration?: number; // Durée d'affichage en millisecondes
}

export const NotificationMessage: React.FC<NotificationMessageProps> = ({ message, type, duration = 5000 }) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!message) return null;

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-md z-[1000]
      ${type === 'success' ? 'bg-green-600 text-white font-semibold' : 'bg-red-500 text-white'}
      ${showMessage ? 'opacity-100' : 'opacity-0'}
      transition-opacity duration-500 ease-in-out`}>
      {message}
    </div>
  );
};
