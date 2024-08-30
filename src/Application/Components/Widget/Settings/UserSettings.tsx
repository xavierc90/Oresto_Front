import React from 'react';

type UserInfosProps = {
  handleReturnToAccount: () => void;
};

export const UserSettings: React.FC<UserInfosProps> = ({ handleReturnToAccount }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <h2 className="text-xl font-bold mb-4">Gérer mon compte</h2>
      <p className="text-gray-600 text-center mb-8">
        Gérez vos données facilement depuis votre espace membre
      </p>
      
      <ul className="flex flex-col text-left text-sm font-semibold gap-4">
        <li><a href="#" className='hover:text-green-800'>Mes préférences (allergies)</a></li>
        <li><a href="#" className='hover:text-green-800'>Mes données personnelles</a></li>
        <li><a href="#" className='hover:text-green-800'>Modifier mon mot de passe</a></li>
        <li><a href="#" className='hover:text-green-800'>Mes réservations Oresto</a></li>
        <li><a href="#" className='hover:text-green-800'>Accessibilité</a></li>
      </ul>

      <div className="mt-8 w-full text-center">
        <button
          className="bg-black text-white py-2 px-4 rounded-lg text-sm font-semibold"
          onClick={handleReturnToAccount}  // Revenir à l'accueil
        >
          Retour à l’accueil
        </button>
      </div>

      <div className="w-full text-center">
        <button className="text-black font-semibold"></button>
      </div>
    </div>
  );
};
