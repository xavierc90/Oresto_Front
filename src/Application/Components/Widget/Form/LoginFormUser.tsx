import React, { Dispatch } from 'react';

export const LoginFormUser: React.FC<{
  setIsLoging: Dispatch<React.SetStateAction<boolean>>,
  setIsLostPassword: Dispatch<React.SetStateAction<boolean>>,
  onLogin: () => void // Ajouter la fonction de connexion
}> = ({ setIsLoging, setIsLostPassword, onLogin }) => {

  const handleForgotPasswordClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsLostPassword(true);
  };

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Simuler la connexion réussie
    onLogin(); // Appeler la fonction de connexion passée en prop
  };

  return (
    <div className="flex flex-col justify-center items-center pt-5 pb-5 px-6 bg-white w-80">
      <img src="../../../public/img/logo-oresto-orange.png" width="250px" alt="Logo Oresto" />
      <h2 className='w-full text-center pt-5'>Connectez-vous ou inscrivez-vous c'est simple et rapide.</h2>
      <form className="flex flex-col justify-center items-center mt-4" onSubmit={handleLoginSubmit}>
        <div className="flex flex-col w-full">
          <label htmlFor="email" className="font-bold items-left">Adresse mail</label>
          <input type="email" id="email" name="email" placeholder="john.doe@gmail.com" className="border-2 border-gray-300 rounded-lg w-full p-2 mt-2 mb-4 font-bold" />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="password" className="font-bold">Mot de passe</label>
          <input type="password" id="password" name="password" placeholder="Votre mot de passe" className="border-2 border-gray-300 rounded-lg w-full p-2 mt-2 font-bold" />
        </div>

        <div className='flex items-center gap-5'>
          <button type="submit" className="bg-black rounded-lg text-white py-2 px-4 mt-6 mb-4 font-bold text-sm">Se connecter</button>
          <button
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
