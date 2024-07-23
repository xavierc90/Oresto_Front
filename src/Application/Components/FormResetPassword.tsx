import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export const FormResetPassword = () => {

  return (
    <div className="flex flex-col items-center justify-center items-center h-screen">
            <a href="/login">
        <img src="../../../public/img/logo-oresto-red.png" width="300px" alt="Logo Oresto" />
      </a>
      <form className="flex flex-col w-80 mt-10">
        <label className="text-lg font-bold mb-4">Adresse mail ou identifiant</label>
        <input type="text" name="login" placeholder="Saisissez votre email ou identifiant" className="border-2 border-gray-300 p-2 mb-6 font-bold" />
        <button type="submit" className="bg-red-500 text-white p-4 rounded-lg w-4/4 font-bold uppercase">Récupérer le mot de passe</button>
        </form>
        <NavLink to="/login" className="pt-10">Retour à la page de connexion</NavLink></div>
  )
}
