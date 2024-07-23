import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
  // État pour la case à cocher
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  // Gestionnaire d'événement pour la case à cocher
  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(event.target.checked);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      
      <a href="/login">
        <img src="../../../public/img/logo-oresto-red.png" width="300px" alt="Logo Oresto" />
      </a>
      
      <form method='POST' className="flex flex-col mt-10">
        <div className='flex gap-4'>
          <div className='flex flex-col'>
            <label className="text-lg font-bold mb-2">Prénom :</label>
            <input type="text" name="firstName" placeholder="Exemple : John" className="border-2 border-gray-300 p-2 mb-6 font-bold" /> 
          </div>       
          <div className='flex flex-col'>
            <label className="text-lg font-bold mb-2">Nom :</label>
            <input type="text" name="lastName" placeholder="Exemple : Doe" className="border-2 border-gray-300 p-2 mb-6 font-bold" /> 
          </div>   
        </div>
        
        <label className="text-lg font-bold mb-2">Adresse mail</label>
        <input type="email" name="email" placeholder="Exemple : entreprise@mail.com" className="border-2 border-gray-300 p-2 mb-6 font-bold" />
        
        <label className="text-lg font-bold mb-2">Mot de passe</label>
        <input type="password" name="password" placeholder="Mot de passe" className="border-2 border-gray-300 p-2 mb-4 font-bold" />
        
        <label className="text-lg font-bold mb-2">Confirmer le mot de passe</label>
        <input type="password" name="confirmPassword" placeholder="Mot de passe" className="border-2 border-gray-300 p-2 mb-2 font-bold" />
        
        <div className="flex flex-col items-center justify-center">
          <div className='my-4'>
            <input 
              type="checkbox" 
              name="cgu" 
              id="cgu" 
              className="mr-2" 
              onChange={handleCheckboxChange} 
            />
            J'accepte les <a href="/rgpd" className="text-black font-bold">conditions générales d'utilisation</a>
          </div>
          
          <button 
            type="submit" 
            className={`bg-black text-white p-4 rounded-lg w-2/4 font-bold uppercase ${isCheckboxChecked ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
            disabled={!isCheckboxChecked}
          >
            Terminer l'inscription
          </button>
        </div>
      </form>
    </div>
  )
}
