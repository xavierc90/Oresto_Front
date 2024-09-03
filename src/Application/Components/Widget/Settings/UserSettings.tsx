import React from 'react';

type UserSettingsProps = {
  handleReturnToAccount: () => void;
  onShowAllergens: () => void;
  onShowPersonalData: () => void;
  onShowBookingHistory: () => void;
  onShowAccessibility: () => void;
};

export const UserSettings: React.FC<UserSettingsProps> = ({
  handleReturnToAccount,
  onShowAllergens,
  onShowPersonalData,
  onShowBookingHistory,
  onShowAccessibility,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <h2 className="text-xl font-bold mb-4">Gérer mon compte</h2>
      <p className="text-gray-600 text-center mb-8">
        Gérez vos données facilement depuis votre espace membre
      </p>
      
      <ul className="flex flex-col text-left text-md font-semibold gap-4">
        <li><a href="#" className='hover:text-green-800' onClick={onShowAllergens}>Mes préférences (allergènes)</a></li>
        <li><a href="#" className='hover:text-green-800' onClick={onShowPersonalData}>Mes données personnelles</a></li>
        <li><a href="#" className='hover:text-green-800' onClick={onShowBookingHistory}>Historique des réservations</a></li>
        <li><a href="#" className='hover:text-green-800' onClick={onShowAccessibility}>Accessibilité</a></li>
      </ul>

      <div className="mt-8 w-full text-center">
        <button
          className="bg-black text-white py-2 px-4 rounded-lg text-sm font-semibold"
          onClick={handleReturnToAccount}
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
