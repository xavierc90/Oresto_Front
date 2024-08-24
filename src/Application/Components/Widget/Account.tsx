import React from 'react';
import ArrowButton from '../Widget/Form/ArrowButton';
import CloseButton from '../Widget/Form/CloseButton';
import { useAuth } from '../../../Module/Auth/useAuth';

type AccountProps = {
  setIsLoging: (value: boolean) => void;
  isContentVisible: boolean;
  setIsContentVisible: (visible: boolean) => void;
  setShowWidget: (visible: boolean) => void;
  handleLogout: () => void;  // Ajoutez cette ligne pour passer la fonction de déconnexion
};

export const Account: React.FC<AccountProps> = ({
  setIsLoging,
  isContentVisible,
  setIsContentVisible,
  setShowWidget,
  handleLogout,  // Assurez-vous que handleLogout est accepté comme prop
}) => {
  const { user } = useAuth();  // Récupération des informations utilisateur via useAuth

  const handleClose = () => {
    setShowWidget(false);  // Masquer le widget
  };

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);  // Basculer la visibilité du contenu
  };

  const handleLogoutClick = () => {
    handleLogout();  // Appeler la fonction de déconnexion passée en prop
    setIsLoging(true);  // Assurer que l'état de connexion est mis à jour
  };

  return (
    <div className="flex flex-col z-50 justify-center items-center pt-5 pb-0 bg-white w-full h-screen lg:h-auto lg-w-auto">
      <div className="fixed flex top-5 right-4 mr-2 gap-2 lg:hidden">
        <ArrowButton isContentVisible={isContentVisible} onClick={toggleContentVisibility} />
        <CloseButton onClick={handleClose} />
      </div>
      <h1 className="text-center font-bold">Bonjour {user?.firstname}</h1>
      <h2 className="text-center">Comment puis-je vous aider ?</h2>
      <button className="bg-green-800 text-white text-sm font-bold px-4 py-2 rounded-lg mt-4">
        Je souhaite réserver une table
      </button>
      <button className="bg-black text-white text-sm font-bold px-4 py-2 rounded-lg mt-4">
        Je souhaite gérer mon compte
      </button>

      <p className="pt-7 pb-3">
        <a href="#" onClick={handleLogoutClick}>Se déconnecter</a>  {/* Utilisation de handleLogoutClick */}
      </p>
    </div>
  );
};
