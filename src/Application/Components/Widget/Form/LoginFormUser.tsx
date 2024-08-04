import React, { Dispatch } from 'react';
import ArrowButton from './ArrowButton';
import CloseButton from './CloseButton';

type LoginFormUserProps = {
  setIsLoging: Dispatch<React.SetStateAction<boolean>>,
  setIsLostPassword: Dispatch<React.SetStateAction<boolean>>,
  onLogin: () => void,
  isContentVisible: boolean,
  setIsContentVisible: (visible: boolean) => void,
  setShowWidget: (visible: boolean) => void,
};

export const LoginFormUser: React.FC<LoginFormUserProps> = ({ 
  setIsLoging, 
  setIsLostPassword, 
  onLogin, 
  isContentVisible, 
  setIsContentVisible, 
  setShowWidget 
}) => {

  const handleForgotPasswordClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsLostPassword(true);
  };

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Simuler la connexion réussie
    onLogin(); // Appeler la fonction de connexion passée en prop
  };

  const handleClose = () => {
    setShowWidget(false); // Masquer le widget en mettant à jour l'état dans HomePage
  };

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible); // Bascule la visibilité du contenu
  };

  return (
    <div className="flex flex-col z-50 justify-center items-center pt-5 pb-5 px-6 bg-white w-full h-screen lg:h-auto">
      <div className='fixed flex top-5 right-4 mr-2 gap-2 lg:hidden'>
        <ArrowButton 
          isContentVisible={isContentVisible} 
          onClick={toggleContentVisibility} 
        />
        <CloseButton 
          onClick={handleClose} 
        />
      </div>
      <img src="../../../public/img/logo-oresto-orange.png" width="250px" alt="Logo Oresto" />
      <h2 className='text-center py-8 w-[218px]'>Connectez-vous ou inscrivez-vous c'est simple et rapide.</h2>
      <form className="flex flex-col justify-center items-center mt-4" onSubmit={handleLoginSubmit}>
        <div className="flex flex-col w-full ">
          <label htmlFor="email" className="font-bold items-left text-left">Adresse mail</label>
          <input type="email" id="email" name="email" placeholder="john.doe@gmail.com" className="border-2 border-gray-300 rounded-lg w-full p-2 mt-2 mb-4 font-bold" />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="password" className="font-bold text-left">Mot de passe</label>
          <input type="password" id="password" name="password" placeholder="Votre mot de passe" className="border-2 border-gray-300 rounded-lg w-full p-2 mt-2 font-bold" />
        </div>

        <div className='flex items-center gap-5 py-5'>
          <button type="submit" className="bg-black rounded-lg text-white py-2 px-4 mt-6 mb-4 font-bold text-sm">Se connecter</button>
          <button
            type="button"
            className="bg-green-900 rounded-lg text-white py-2 px-4 mt-6 mb-4 font-bold text-sm"
            onClick={() => setIsLoging(false)}>S'inscrire
          </button>
        </div>
        <a 
          href="#" 
          onClick={handleForgotPasswordClick} 
          className="hover:text-black text-sm"
        >
          J'ai oublié mon mot de passe
        </a>
      </form>
    </div>
  );
};
