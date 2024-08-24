import React from 'react';
import ArrowButton from '../Widget/Form/ArrowButton';
import CloseButton from '../Widget/Form/CloseButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Module/Auth/auth.hook'; // Assurez-vous que ce chemin est correct
import { User } from '../../../Module/Types/user.type'; // Assurez-vous que ce chemin est correct

type AccountProps = {
  setIsLoging: (value: boolean) => void;
  isContentVisible: boolean;
  setIsContentVisible: (visible: boolean) => void;
  setShowWidget: (visible: boolean) => void;
};

export const Account: React.FC<AccountProps> = ({ 
  isContentVisible, 
  setIsContentVisible, 
  setShowWidget,
}) => {

  const handleClose = () => {
    setShowWidget(false); // Masquer le widget en mettant à jour l'état dans HomePage
  };

  const user = useAuth(); // Récupère l'utilisateur connecté

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible); // Bascule la visibilité du contenu
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigate = useNavigate();
  const { logout } = useAuth();


  return (
    <div className="flex flex-col z-50 justify-center items-center pt-5 pb-0 bg-white w-full h-screen lg:h-auto lg-w-auto">
      <div className='fixed flex top-5 right-4 mr-2 gap-2 lg:hidden'>
        <ArrowButton 
          isContentVisible={isContentVisible} 
          onClick={toggleContentVisibility} 
        />
        <CloseButton 
          onClick={handleClose} 
        />
      </div>
      <h1 className='text-center font-bold'>Bonjour {user?.firstname}</h1> {/* Affichage du prénom */}
      <h2 className='text-center'>Comment puis-je vous aider ?</h2>
      <button className='bg-green-800 text-white text-sm font-bold px-4 py-2 rounded-lg mt-4'>Je souhaite réserver une table</button>
      <button className='bg-black text-white text-sm font-bold px-4 py-2 rounded-lg mt-4'>Je souhaite gérer mon compte</button>

      <p className='pt-7 pb-3'>
        <a href="#" onClick={handleLogout}>Se déconnecter</a></p>
    </div>
  );
};
