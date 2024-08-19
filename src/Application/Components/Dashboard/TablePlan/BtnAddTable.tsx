import React from 'react';

// Définition de l'interface pour les props
interface BtnAddTableProps {
  onClick: () => void; // fonction qui ne prend rien en entrée et ne retourne rien
}

export const BtnAddTable: React.FC<BtnAddTableProps> = ({ onClick }) => {
  return (
    <div>
      <button
        className='bg-black text-white text-sm font-bold p-3'
        onClick={onClick}
      >
        Ajouter une table
      </button>
    </div>
  );
}
