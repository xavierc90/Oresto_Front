import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa'; // Importation des icônes de FontAwesome

interface StatusLabelProps {
  status: string;
}

export const StatusLabel: React.FC<StatusLabelProps> = ({ status }) => {
  let statusText = '';
  let color = '';
  let IconComponent = null; // Variable pour stocker l'icône

  switch (status) {
    case 'confirmed':
      statusText = 'Confirmée';
      color = '#4CAF50';  // Vert
      IconComponent = FaCheckCircle; // Icône check-circle pour le statut confirmé
      break;
    case 'canceled':
      statusText = 'Annulée';
      color = '#B8BCBA';  // Gris
      IconComponent = FaTimesCircle; // Icône times-circle pour le statut annulé
      break;
    case 'waiting':
      statusText = 'En attente';
      color = '#FF9800';  // Orange
      IconComponent = FaClock; // Icône clock pour le statut en attente
      break;
    default:
      statusText = 'État inconnu';
      color = '#9E9E9E';  // Gris
      IconComponent = FaClock; // Icône par défaut
  }

  return (
    <span className="flex items-center">
      {IconComponent && <IconComponent className="mr-2" style={{ color }} />} {/* Affiche l'icône */}
      {statusText}
    </span>
  );
};

export default StatusLabel;
