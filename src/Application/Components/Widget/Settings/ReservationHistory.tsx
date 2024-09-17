import React from 'react';

type AllergensProps = {
  onReturnToAccount: () => void;
};

export const ReservationHistory: React.FC<AllergensProps> = ({ onReturnToAccount }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <h2 className="text-xl font-bold mb-4">Préférences Allergènes</h2>
      <p className="text-gray-600 text-center mb-8">
        Sélectionnez vos préférences concernant les allergènes.
      </p>

      {/* Contenu pour gérer les préférences d'allergènes */}
      s
      <div className="mt-8 w-full text-center">
        <button
          className="bg-black text-white py-2 px-4 rounded-lg text-sm font-semibold"
          onClick={onReturnToAccount}
        >
          Retour à l’accueil
        </button>
      </div>
    </div>
  );
};
