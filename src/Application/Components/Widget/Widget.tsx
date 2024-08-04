import React, { useState } from 'react';
import { LoginFormUser } from './Form/LoginFormUser';
import { RegisterFormUser } from './Form/RegisterFormUser';
import { FormResetPassword } from './Form/FormResetPassword';
import ArrowButton from './Form/ArrowButton';
import CloseButton from './Form/CloseButton';

type WidgetProps = {
  setShowWidget: (visible: boolean) => void;
  isContentVisible: boolean;
  setIsContentVisible: (visible: boolean) => void;
};

export const Widget: React.FC<WidgetProps> = ({ setShowWidget, isContentVisible, setIsContentVisible }) => {
  const [isLoging, setIsLoging] = useState(true);
  const [isLostPassword, setIsLostPassword] = useState(false);

  const handleLogin = () => {
    console.log("User is logging in...");
  };

  const handleClose = () => {
    setShowWidget(false); // Masquer le widget en mettant à jour l'état dans HomePage
  };

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div className="fixed w-full bottom-0">
      <div>
        <div className='flex justify-between items-center bg-green-800 top-10 w-full text-white py-3 pl-4 z-50 rounded-t-xl'>
          Réserver en ligne
          <div className='flex gap-2 mr-4'>
            <ArrowButton 
              isContentVisible={isContentVisible} 
              onClick={toggleContentVisibility} 
            />
            <CloseButton 
              onClick={handleClose} 
            />
          </div>
        </div>

        {isContentVisible && ( // Utiliser l'état pour décider d'afficher ou non le contenu
          <>
            {isLostPassword ? (
              <FormResetPassword 
                setIsLostPassword={setIsLostPassword} 
                isContentVisible={isContentVisible}
                setIsContentVisible={setIsContentVisible}
                setShowWidget={setShowWidget}
                setIsLoging={setIsLoging} />
            ) : (
              isLoging ? (
                <LoginFormUser 
                  setIsLoging={setIsLoging} 
                  setIsLostPassword={setIsLostPassword} 
                  onLogin={handleLogin}
                  isContentVisible={isContentVisible}
                  setIsContentVisible={setIsContentVisible}
                  setShowWidget={setShowWidget}
                />
              ) : (
                <RegisterFormUser 
                  setIsLoging={setIsLoging} 
                  isContentVisible={isContentVisible}
                  setIsContentVisible={setIsContentVisible}
                  setShowWidget={setShowWidget}
                />
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};
