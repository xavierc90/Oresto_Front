import React, { useState } from 'react';
import ArrowButton from '../Widget/Form/ArrowButton';
import CloseButton from '../Widget/Form/CloseButton';
import { Booking } from '../Widget/Booking';
import { useAuth } from '../../../Module/Auth/useAuth';
import { UserSettings } from './Settings/UserSettings'; // Importer le composant UserSettings

type AccountProps = {
  setIsLoging: (value: boolean) => void;
  isContentVisible: boolean;
  setIsContentVisible: (visible: boolean) => void;
  setShowWidget: (visible: boolean) => void;
  handleLogout: () => void;
};

export const Account: React.FC<AccountProps> = ({
  setIsLoging,
  isContentVisible,
  setIsContentVisible,
  setShowWidget,
  handleLogout,
}) => {
  const { user } = useAuth();
  const [showBooking, setShowBooking] = useState(false); // État pour contrôler la visibilité du composant Booking
  const [showUserSettings, setShowUserSettings] = useState(false); // État pour contrôler la visibilité du composant UserSettings
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // État pour la date sélectionnée

  const handleClose = () => {
    setShowWidget(false);
  };

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const handleLogoutClick = () => {
    handleLogout();
    setIsLoging(true);
  };

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
    setShowBooking(true);
    setShowUserSettings(false);
  };

  const handleTimeSelected = () => {
    setShowBooking(false);
    console.log("Réservation confirmée pour la date", selectedDate);
  };

  const handleManageAccountClick = () => {
    setShowUserSettings(true);
    setShowBooking(false);
  };

  const handleReturnToAccount = () => {
    setShowBooking(false);
    setShowUserSettings(false);
  };

  return (
    <div className="flex flex-col z-50 justify-center items-center pt-5 pb-0 bg-white w-full h-screen lg:h-auto lg-w-auto">
      <div className="fixed flex top-5 right-4 mr-2 gap-2 lg:hidden">
        <ArrowButton isContentVisible={isContentVisible} onClick={toggleContentVisibility} />
        <CloseButton onClick={handleClose} />
      </div>

      {!showBooking && !showUserSettings ? (
        <>
          <h1 className="text-center text-md font-bold pb-2">Bonjour {user?.firstname}</h1>
          <h2 className="text-center text-md mb-4">Comment puis-je vous aider ?</h2>
          <button
            className="bg-green-800 text-white text-sm font-bold px-4 py-2 rounded-lg mt-4"
            onClick={() => setShowBooking(true)} // Afficher le composant Booking
          >
            Je souhaite réserver une table
          </button>
          <button
            className="bg-black text-white text-sm font-bold px-4 py-2 rounded-lg mt-4"
            onClick={handleManageAccountClick} // Afficher le composant UserSettings
          >
            Je souhaite gérer mon compte
          </button>
          <p className="pt-7 pb-3">
            <a href="#" onClick={handleLogoutClick} className='font-semibold text-sm'>Se déconnecter</a>
          </p>
        </>
      ) : showBooking ? (
        <Booking 
          selectedDate={selectedDate} 
          onTimeSelected={handleTimeSelected}
          onReturnToAccount={handleReturnToAccount}  
        />
      ) : (
        <UserSettings 
          handleReturnToAccount={handleReturnToAccount}
        />
      )}
    </div>
  );
};
