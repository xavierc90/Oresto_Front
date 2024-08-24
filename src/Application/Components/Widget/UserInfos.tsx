import React from 'react';

type UserInfosProps = {
  handleReturnToAccount: () => void;
};

export const UserInfos: React.FC<UserInfosProps> = ({ handleReturnToAccount }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Gérer mon compte</h2>
      <p className="text-gray-600 text-center mb-8">
        Gérez vos données facilement depuis votre espace membre
      </p>
      
      <ul className="flex flex-col gap-3">
        <li>
          <button className="bg-black text-white p-3 rounded-lg text-sm font-semibold text-black">Mes données personnelles</button>
        </li>
        <li>
          <button className="bg-black text-white p-3 px-4 rounded-lg text-sm font-semibold text-black">Modifier le mot de passe</button>
        </li>
        <li>
          <button className="bg-black text-white p-3 px-2 rounded-lg text-sm font-semibold text-black">Mes préférences (allergies)</button>
        </li>
        <li>
          <button className="bg-black text-white py-3 px-5 rounded-lg text-sm font-semibold text-black">Mes réservations Oresto</button>
        </li>
      </ul>

      <div className="mt-8 w-full text-center">
        <button
          className="py-2 px-4 rounded-lg text-sm font-semibold"
          onClick={handleReturnToAccount}  // Revenir à l'accueil
        >
          Retour à l’accueil
        </button>
      </div>

      <div className="mt-4 w-full text-center">
        <button className="text-black font-semibold"></button>
      </div>
    </div>
  );
};
