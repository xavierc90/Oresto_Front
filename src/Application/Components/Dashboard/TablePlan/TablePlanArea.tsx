import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { http } from '../../../../Infrastructure/Http/axios.instance';
import { Table } from '../../../../Module/Types/table.type';
import { FaTrashAlt } from "react-icons/fa";

interface TableAreaProps {
  restaurant: { _id: string };
  token: string | null;
  tables: Table[]; // Accepter les tables en tant que prop
  onTablesUpdate: () => void; // Fonction de rappel pour notifier le parent des mises à jour
}

export const TablePlanArea: React.FC<TableAreaProps> = ({ restaurant, token, tables, onTablesUpdate }) => {
  const [draggingTableId, setDraggingTableId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [overTrash, setOverTrash] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null); // Message de suppression
  const [showDeleteMessage, setShowDeleteMessage] = useState(false); // Pour gérer l'animation du message
  const trashRef = useRef<HTMLDivElement | null>(null);
  const [clickStartedPosition, setClickStartedPosition] = useState<{ x: number; y: number } | null>(null);
  const [clickTime, setClickTime] = useState<number>(0);

  // Coordonnées et dimensions de la poubelle
  const deleteZone = { width: 100, height: 100 };

  // Fonction pour archiver la table et envoyer les coordonnées au backend
  const handleDragStop = async (e: any, data: any, table: Table): Promise<void> => {
    const position_x = data.x;
    const position_y = data.y;
    setDraggingTableId(null);
    setIsDragging(false);

    // Vérifier si la table est déposée dans la zone de la poubelle
    const trashElement = trashRef.current;
    if (trashElement) {
      const trashRect = trashElement.getBoundingClientRect();
      const tableX = e.clientX;
      const tableY = e.clientY;

      if (
        tableX >= trashRect.left &&
        tableX <= trashRect.right &&
        tableY >= trashRect.top &&
        tableY <= trashRect.bottom
      ) {
        try {
          // Appel pour archiver la table
          await http.put(`/archive_table/${table._id}`, {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setDeleteMessage(`La table n°${table.number} pour ${table.capacity} personnes a été supprimée`);
          setShowDeleteMessage(false);
          setTimeout(() => setShowDeleteMessage(true), 100); // Activer l'animation
          setTimeout(() => setShowDeleteMessage(false), 5000); // Masquer le message après 5 secondes
          onTablesUpdate(); // Rafraîchir les tables après l'archivage
          return;
        } catch (error) {
          console.error('Erreur lors de l\'archivage de la table:', error);
        }
      }
    }

    // Mettre à jour la position de la table si elle n'a pas été archivée
    try {
      await http.put(
        `/update_table/${table._id}`,
        { position_x, position_y },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onTablesUpdate();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la table:', error);
    }
  };

  const handleTableClick = async (table: Table) => {
    const newRotation = (table.rotate || 0) + 30;

    try {
      await http.put(
        `/update_table/${table._id}`,
        { rotate: newRotation % 360 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onTablesUpdate(); // Rafraîchir les tables après la rotation
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la rotation de la table:', error);
    }
  };

  const handleStart = (e: any, data: any) => {
    setIsDragging(true); // Activer le dragging
    setClickStartedPosition({ x: data.x, y: data.y });
    setClickTime(Date.now()); // Enregistrer le temps de départ
  };

  const handleDrag = (e: any, data: any) => {
    const trashElement = trashRef.current;
    if (trashElement) {
      const trashRect = trashElement.getBoundingClientRect();
      const tableX = e.clientX;
      const tableY = e.clientY;

      if (
        tableX >= trashRect.left &&
        tableX <= trashRect.right &&
        tableY >= trashRect.top &&
        tableY <= trashRect.bottom
      ) {
        setOverTrash(true); // Change l'opacité si la table est au-dessus de la poubelle
      } else {
        setOverTrash(false); // Rétablir l'opacité si elle est en dehors
      }
    }
  };

  const handleStop = (e: any, data: any, table: Table) => {
    const distanceMoved = Math.abs(data.x - clickStartedPosition!.x) + Math.abs(data.y - clickStartedPosition!.y);
    const clickDuration = Date.now() - clickTime; // Calculer la durée du clic
    setDraggingTableId(null);
    setIsDragging(false);  // Désactiver le mode "dragging"
    setOverTrash(false); // Réinitialiser l'opacité de la poubelle

    if (distanceMoved < 5 && clickDuration < 300) {
      // Si le clic n'est pas un déplacement, déclencher la rotation
      handleTableClick(table);
    } else {
      // Sinon, traiter cela comme un déplacement
      handleDragStop(e, data, table);
    }
  };

  const getTableColor = (tableId: string): string => {
    return draggingTableId === tableId ? '#848485' : '#EAE5E5';
  };

  const renderTableSVG = (table: Table) => {
    const tableColor = getTableColor(table._id);
    const rotation = table.rotate || 0;

    if (table.shape === 'rectangle') {
      if (table.capacity === 4) {
        return (
          <svg
            width="123"
            height="74"
            viewBox="0 0 123 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <ellipse cx="32.3326" cy="8.25806" rx="7.5806" ry="7.37635" fill="#7F7F7F" />
            <ellipse cx="32.3326" cy="66.2533" rx="7.5806" ry="7.37634" fill="#7F7F7F" />
            <ellipse cx="90.4502" cy="8.25806" rx="7.58057" ry="7.37635" fill="#7F7F7F" />
            <ellipse cx="90.4502" cy="66.2533" rx="7.58057" ry="7.37634" fill="#7F7F7F" />
            <rect y="8" width="123" height="57" fill={tableColor} />
          </svg>
        );
      }
      if (table.capacity === 6) {
        return (
          <svg
            width="123"
            height="74"
            viewBox="0 0 123 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <ellipse cx="22.3326" cy="8.25806" rx="7.5806" ry="7.37635" fill="#7F7F7F" />
            <ellipse cx="22.3326" cy="66.2533" rx="7.5806" ry="7.37634" fill="#7F7F7F" />
            <ellipse cx="63.4502" cy="8.25806" rx="7.58057" ry="7.37635" fill="#7F7F7F" />
            <ellipse cx="63.4502" cy="66.2533" rx="7.58057" ry="7.37634" fill="#7F7F7F" />
            <ellipse cx="101.45" cy="8.25806" rx="7.58057" ry="7.37635" fill="#7F7F7F" />
            <ellipse cx="101.45" cy="66.2533" rx="7.58057" ry="7.37634" fill="#7F7F7F" />
            <rect y="8" width="123" height="57" fill={tableColor} />
          </svg>
        );
      }
      if (table.capacity === 8) {
        return (
          <svg
            width="153"
            height="74"
            viewBox="0 0 153 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <ellipse cx="37.3326" cy="8.25806" rx="7.5806" ry="7.37635" fill="#7F7F7F" />
            <ellipse cx="37.3326" cy="66.2533" rx="7.5806" ry="7.37634" fill="#7F7F7F" />
            <ellipse cx="78.4502" cy="8.25806" rx="7.58057" ry="7.37635" fill="#7F7F7F" />
            <ellipse cx="78.4502" cy="66.2533" rx="7.58057" ry="7.37634" fill="#7F7F7F" />
            <ellipse cx="116.45" cy="8.25806" rx="7.58057" ry="7.37635" fill="#7F7F7F" />
            <ellipse cx="116.45" cy="66.2533" rx="7.58057" ry="7.37634" fill="#7F7F7F" />
            <ellipse cx="8.33255" cy="36.2533" rx="7.5806" ry="7.37634" fill="#7F7F7F" />
            <ellipse cx="145.333" cy="36.2533" rx="7.5806" ry="7.37634" fill="#7F7F7F" />
            <rect x="10" y="8" width="134" height="57" fill={tableColor} />
          </svg>
        );
      }
    } else if (table.shape === 'round') {
      if (table.capacity === 2) {
        return (
          <svg
            width="70"
            height="85"
            viewBox="0 0 70 85"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <ellipse cx="35.5806" cy="7.37634" rx="7.5806" ry="7.37634" fill="#7F7F7F" />
            <ellipse cx="35.5806" cy="77.3763" rx="7.5806" ry="7.37634" fill="#7F7F7F" />
            <rect y="7" width="70" height="70" rx="35" fill={tableColor} />
          </svg>
        );
      }
      if (table.capacity === 4) {
        return (
          <svg
            width="86"
            height="85"
            viewBox="0 0 86 85"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <ellipse cx="43.5806" cy="7.37634" rx="7.5806" ry="7.37634" fill="#7F7F7F" />
            <ellipse cx="43.5806" cy="77.3763" rx="7.5806" ry="7.37634" fill="#7F7F7F" />
            <ellipse cx="7.5806" cy="42.3763" rx="7.5806" ry="7.37634" fill="#7F7F7F" />
            <ellipse cx="77.5811" cy="42.3763" rx="7.5806" ry="7.37634" fill="#7F7F7F" />
            <rect x="8" y="7" width="70" height="70" rx="35" fill={tableColor} />
          </svg>
        );
      }
    } else if (table.shape === 'square') {
      if (table.capacity === 2) {
        return (
          <svg
            width="70"
            height="90"
            viewBox="0 0 70 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <ellipse cx="35.5806" cy="7.37634" rx="7.5806" ry="7.37634" fill="#7F7F7F" />
            <ellipse cx="35.5806" cy="82.3763" rx="7.5806" ry="7.37634" fill="#7F7F7F" />
            <rect y="10" width="70" height="70" fill={tableColor} />
          </svg>
        );
      }
      if (table.capacity === 4) {
        return (
          <svg
            width="87"
            height="86"
            viewBox="0 0 87 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <ellipse cx="43.5806" cy="7.37634" rx="7.5806" ry="7.37634" fill="#7F7F7F" />
            <ellipse cx="43.5806" cy="78.3763" rx="7.5806" ry="7.37634" fill="#7F7F7F" />
            <ellipse cx="7.5806" cy="44.3763" rx="7.5806" ry="7.37634" fill="#7F7F7F" />
            <ellipse cx="78.5811" cy="44.3763" rx="7.5806" ry="7.37634" fill="#7F7F7F" />
            <rect x="8" y="8" width="70" height="70" fill={tableColor} />
          </svg>
        );
      }
    }
    return null; // Valeur par défaut si aucune condition n'est remplie
  };

  return (
    <div
      className="table-plan max-w-4/5 h-96 ml-12 mt-6 border border-zinc-300 dark:bg-dark-900 dark:border-dark-800 dark:text-black"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background:
          'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,0,0,0.1) 20px), repeating-linear-gradient(-90deg, transparent, transparent 19px, rgba(0,0,0,0.1) 20px)',
      }}
    >
      {/* Message de suppression */}
      {deleteMessage && (
        <div className={`success-message ${showDeleteMessage ? 'show' : ''}`}>
          {deleteMessage}
        </div>
      )}

      {/* Icône Poubelle */}
      {isDragging && (
        <div
          ref={trashRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            bottom: '20px', // Placer la corbeille en bas à droite
            right: '20px',
            width: `${deleteZone.width}px`,
            height: `${deleteZone.height}px`,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            opacity: overTrash ? 1 : 0.5, // Opacité variable
          }}
        >
          <FaTrashAlt size={25} color="#ff0000" /> {/* Taille et couleur de l'icône de la corbeille */}
          <span className='text-sm'>Supprimer</span>
        </div>
      )}

      {tables
        .filter((table) => table.status !== 'archived') // Filtrer les tables avec le statut "available" seulement
        .map((table) => (
          <Draggable
            key={table._id}
            bounds="parent"
            defaultPosition={{ x: table.position_x, y: table.position_y }}
            onStart={(e, data) => {
              setIsDragging(true); // La table commence à être déplacée
              handleStart(e, data);
            }}
            onDrag={(e, data) => handleDrag(e, data)}
            onStop={(e, data) => handleStop(e, data, table)}
          >
            <div className="table-container" style={{ position: 'absolute', cursor: 'pointer' }}>
              {renderTableSVG(table)}
              <div className="number-circle">
                <span>{table.number}</span>
              </div>
            </div>
          </Draggable>
        ))}
    </div>
  );
};
