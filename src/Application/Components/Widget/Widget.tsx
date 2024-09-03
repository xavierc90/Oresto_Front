import React, { useState, useEffect } from 'react';
import { LoginFormUser } from './Form/LoginFormUser';
import { RegisterFormUser } from './Form/RegisterFormUser';
import { FormResetPassword } from './Form/FormResetPassword';
import ArrowButton from './Form/ArrowButton';
import CloseButton from './Form/CloseButton';
import { RiDragMove2Fill } from "react-icons/ri";
import { Account } from './Account';
import { useAuth } from '../../../Module/Auth/useAuth';

type WidgetProps = {
  setShowWidget: (visible: boolean) => void;
  isContentVisible: boolean;
  setIsContentVisible: (visible: boolean) => void;
};

export const Widget: React.FC<WidgetProps> = ({
  setShowWidget,
  isContentVisible,
  setIsContentVisible,
}) => {
  const { user, login, logout } = useAuth();
  const [isLoging, setIsLoging] = useState(true);
  const [isLostPassword, setIsLostPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoging(false); // Si l'utilisateur est connecté, mettre à jour l'état
    }
  }, [user]);

  const handleLoginSuccess = () => {
    setIsLoging(false); // Indiquer que l'utilisateur est connecté
  };

  const handleClose = () => {
    setShowWidget(false);
  };

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div className="fixed text-center w-full bottom-0 lg:w-auto lg:bottom-0 lg:right-10 z-10">
      <div className="flex flex-col lg:flex-row lg:fixed lg:bottom-0 lg:right-10 lg:w-70 lg:flex lg:flex-col lg:shadow-2xl">
        <div className="flex justify-center items-center bg-green-800 lg:h-10 text-white py-3 pl-4 rounded-t-none lg:rounded-none lg:rounded-tl-xl lg:rounded-tr-xl lg:rounded-t-xl z-10 gap-4">
          <a
            onClick={toggleContentVisibility}
            className="flex justify-center items-center cursor-pointer hover:text-white w-full lg:w-auto"
          >
            <RiDragMove2Fill /> <span className="pl-1">Réserver en ligne</span>
          </a>
          <div className="flex gap-2 ml-auto mr-4 lg:flex lg:gap-8">
            <div className="hidden lg:block mr-5">
              <ArrowButton
                isContentVisible={isContentVisible}
                onClick={toggleContentVisibility}
              />
            </div>
            <div className="hidden lg:block absolute right-3 top-4 lg:top-2 lg:right-2">
              <CloseButton onClick={handleClose} />
            </div>
          </div>
        </div>

        {isContentVisible && (
          <div className="w-full bg-white p-4 lg:w-80 lg:h-auto">
            {user ? (
              <Account
                setIsLoging={setIsLoging}
                isContentVisible={isContentVisible}
                setIsContentVisible={setIsContentVisible}
                setShowWidget={setShowWidget}
                handleLogout={logout}
              />
            ) : isLostPassword ? (
              <FormResetPassword
                setIsLostPassword={setIsLostPassword}
                isContentVisible={isContentVisible}
                setIsContentVisible={setIsContentVisible}
                setShowWidget={setShowWidget}
                setIsLoging={setIsLoging}
              />
            ) : isLoging ? (
              <LoginFormUser
                onLoginSuccess={handleLoginSuccess}
                setIsLoging={setIsLoging}
                setIsLostPassword={setIsLostPassword}
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};
