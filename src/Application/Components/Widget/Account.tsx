import React, { useState } from 'react';
import ArrowButton from '../Widget/Form/ArrowButton';
import CloseButton from '../Widget/Form/CloseButton';
import { Reservation } from '../Widget/Reservation';
import { useAuth } from '../../../Module/Auth/useAuth';
import { UserSettings } from './Settings/UserSettings';
import { Allergens } from './Settings/Allergens';
import { PersonalData } from './Settings/PersonalData';
import { ReservationHistory } from './Settings/ReservationHistory';
import { Accessibility } from './Settings/Accessibility';

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
  const [showReservation, setShowReservation] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [showAllergens, setShowAllergens] = useState(false);
  const [showPersonalData, setShowPersonalData] = useState(false);
  const [showReservationHistory, setShowReservationHistory] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  const handleManageAccountClick = () => {
    setShowUserSettings(true);
    setShowReservation(false);
  };

  const handleReturnToAccount = () => {
    setShowReservation(false);
    setShowUserSettings(false);
    setShowAllergens(false);
    setShowPersonalData(false);
    setShowReservationHistory(false);
    setShowAccessibility(false);
  };

  return (
    <div className="flex flex-col z-50 justify-center items-center pt-5 pb-0 bg-white w-full h-screen lg:h-auto lg:w-auto">
      <div className="fixed flex top-5 right-4 mr-2 gap-2 lg:hidden">
        <ArrowButton isContentVisible={isContentVisible} onClick={toggleContentVisibility} />
        <CloseButton onClick={handleClose} />
      </div>

      {!showReservation && !showUserSettings && !showAllergens && !showPersonalData && !showReservationHistory && !showAccessibility ? (
        <>
          <h1 className="text-center text-md font-bold pb-2">Bonjour {user?.firstname}</h1>
          <h2 className="text-center text-md mb-4">Comment puis-je vous aider ?</h2>
          <button
            className="bg-green-800 text-white text-sm font-bold px-4 py-2 rounded-lg mt-4"
            onClick={() => setShowReservation(true)}
          >
            Je souhaite réserver une table
          </button>
          <button
            className="bg-black text-white text-sm font-bold px-4 py-2 rounded-lg mt-4"
            onClick={handleManageAccountClick}
          >
            Je souhaite gérer mon compte
          </button>
          <p className="pt-7 pb-3">
            <a href="#" onClick={handleLogoutClick} className="font-semibold text-sm">Se déconnecter</a>
          </p>
        </>
      ) : showReservation ? (
        <Reservation 
          selectedDate={selectedDate} 
          onTimeSelected={() => setShowReservation(false)}
          onReturnToAccount={handleReturnToAccount}  
        />
      ) : showUserSettings ? (
        <UserSettings 
          handleReturnToAccount={handleReturnToAccount}
          onShowAllergens={() => {
            setShowAllergens(true);
            setShowUserSettings(false);
          }}
          onShowPersonalData={() => {
            setShowPersonalData(true);
            setShowUserSettings(false);
          }}
          onShowReservationHistory={() => {
            setShowReservationHistory(true);
            setShowUserSettings(false);
          }}
          onShowAccessibility={() => {
            setShowAccessibility(true);
            setShowUserSettings(false);
          }}
        />
      ) : showAllergens ? (
        <Allergens onReturnToAccount={handleReturnToAccount} />
      ) : showPersonalData ? (
        <PersonalData onReturnToAccount={handleReturnToAccount} />
      ) : showReservationHistory ? (
        <ReservationHistory onReturnToAccount={handleReturnToAccount} />
      ) : showAccessibility ? (
        <Accessibility onReturnToAccount={handleReturnToAccount} />
      ) : null}
    </div>
  );
};
