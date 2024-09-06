import React from 'react';

interface StatusLabelProps {
  status: string;
}

export const StatusLabel: React.FC<StatusLabelProps> = ({ status }) => {
  let statusText = '';
  let color = '';

  switch (status) {
    case 'confirmed':
      statusText = 'Confirmée';
      color = '#C31B1B';  // Rouge
      break;
    case 'canceled':
      statusText = 'Annulée';
      color = '#EBEBEB';  // Gris
      break;
    case 'waiting':
      statusText = 'En attente';
      color = '#FF9800';  // Orange
      break;
    default:
      statusText = 'État inconnu';
      color = '#9E9E9E';  // Gris
  }

  return (
    <span className="flex items-center">
      <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: color }}></span>
      {statusText}
    </span>
  );
};

export default StatusLabel;
