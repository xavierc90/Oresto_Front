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
    <div className="fixed text-center w-full bottom-0 lg:w-auto lg:bottom-0 lg:right-10 z-10 ">
      <div className='flex flex-col lg:flex-row lg:fixed lg:bottom-0 lg:right-10 lg:w-50 lg:flex lg:flex-col lg:shadow-2xl'>
        <div className='flex justify-center items-center bg-green-800 w-full lg:w-80 lg:h-10 text-white py-3 pl-4 rounded-t-xl lg:rounded-none lg:rounded-tl-xl lg:rounded-tr-xl z-10'>
          <a onClick={toggleContentVisibility} className='cursor-pointer hover:text-white'>Réserver en ligne</a>
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
          </div>
        )}
      </div>
    </div>
  );
};
