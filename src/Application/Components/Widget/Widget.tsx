import React, { useState } from 'react';
import { LoginFormUser } from './Form/LoginFormUser';
import { RegisterFormUser } from './Form/RegisterFormUser';
import { FormResetPassword } from './Form/FormResetPassword';
import ArrowButton from './Form/ArrowButton';
import CloseButton from './Form/CloseButton';
import { RiDragMove2Fill } from "react-icons/ri";
import {Account} from './../Widget/Account';

type WidgetProps = {
  setShowWidget: (visible: boolean) => void;
  isContentVisible: boolean;
  setIsContentVisible: (visible: boolean) => void;
};

export const Widget: React.FC<WidgetProps> = ({ setShowWidget, isContentVisible, setIsContentVisible }) => {
  const [isLoging, setIsLoging] = useState(true);
  const [isLostPassword, setIsLostPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nouvel état pour gérer la connexion

  const handleLogin = () => {
    setIsLoggedIn(true); // Mettre à jour l'état pour afficher le composant Account
  };

  const handleClose = () => {
    setShowWidget(false); // Masquer le widget en mettant à jour l'état dans HomePage
  };

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div className="fixed text-center w-full bottom-0 lg:w-auto lg:bottom-0 lg:right-10 z-10 ">
      <div className='flex flex-col lg:flex-row lg:fixed lg:bottom-0 lg:right-10 lg:w-70 lg:flex lg:flex-col lg:shadow-2xl'>
        <div className='flex justify-center items-center bg-green-800 lg:h-10 text-white py-3 pl-4 rounded-t-none lg:rounded-none lg:rounded-tl-xl lg:rounded-tr-xl lg:rounded-t-xl z-10 gap-4'>
          <a onClick={toggleContentVisibility} className='flex justify-center items-center cursor-pointer hover:text-white w-full lg:w-auto'>
            <RiDragMove2Fill /> <span className='pl-1'>Réserver en ligne</span>
          </a>
          <div className='flex gap-2 ml-auto mr-4 lg:flex lg:gap-8'>
            <div className='hidden lg:block mr-5'>
              <ArrowButton 
                isContentVisible={isContentVisible} 
                onClick={toggleContentVisibility}
              />
            </div>
            <div className='hidden lg:block absolute right-3 top-4 lg:top-2 lg:right-2'>
              <CloseButton 
                onClick={handleClose} 
              />
            </div>
          </div>
        </div>

        {isContentVisible && ( 
          <div className='w-full bg-white p-4 lg:w-80 lg:h-auto'>
            {isLoggedIn ? ( // Afficher le composant Account si l'utilisateur est connecté
              <Account />
            ) : isLostPassword ? (
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
                  onLogin={handleLogin} // Passer la fonction de gestion de la connexion
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
          </div>
        )}
      </div>
    </div>
  );
};
