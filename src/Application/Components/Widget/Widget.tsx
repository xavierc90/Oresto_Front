import { useState } from 'react';
import { LoginFormUser } from './Form/LoginFormUser';
import { RegisterFormUser } from './Form/RegisterFormUser';
import { FormResetPassword } from './Form/FormResetPassword';
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
    setIsContentVisible(!isContentVisible); // Bascule la visibilité du contenu
  };

  return (
    <div className="border-1 shadow-2xl border-gray-300 fixed bottom-0 right-10 bottom-0 flex items-center justify-center">
      <div>
        <div className='flex justify-between items-center bg-green-800 top-0 w-80 text-white py-3 pl-4 rounded-t-xl'>
          Réserver en ligne
          <div className='flex gap-2 mr-4'>
            <button 
              onClick={toggleContentVisibility} // Gérer le clic sur la flèche
              className='hover:text-white'
            >
              {isContentVisible ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
            </button>
            <button 
              onClick={handleClose} // Utiliser un bouton pour gérer le clic sur la croix
              className='hover:text-white'
            >
              <RxCross1 size={20} />
            </button>
          </div>
        </div>

        {isContentVisible && ( // Utiliser l'état pour décider d'afficher ou non le contenu
          <>
            {isLostPassword ? (
              <FormResetPassword setIsLostPassword={setIsLostPassword} setIsLoging={setIsLoging} />
            ) : (
              isLoging ? (
                <LoginFormUser 
                  setIsLoging={setIsLoging} 
                  setIsLostPassword={setIsLostPassword} 
                  onLogin={handleLogin}
                />
              ) : (
                <RegisterFormUser setIsLoging={setIsLoging} />
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};
