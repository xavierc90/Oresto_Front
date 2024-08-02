import React, { Dispatch } from 'react';

export const Account = () => {

  return (
    <div className="flex flex-col justify-center items-center pt-5 pb-5 px-6 bg-white w-80">
      <img src="../../../public/img/logo-oresto-orange.png" width="250px" alt="Logo Oresto" />
      <h2 className='w-full text-center pt-5'>Connectez-vous ou inscrivez-vous c'est simple et rapide.</h2>
        <div className="flex flex-col w-full">
          <label htmlFor="email" className="font-bold items-left">Adresse mail</label>
          <input type="email" id="email" name="email" placeholder="john.doe@gmail.com" className="border-2 border-gray-300 rounded-lg w-full p-2 mt-2 mb-4 font-bold" />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="password" className="font-bold">Mot de passe</label>
          <input type="password" id="password" name="password" placeholder="Votre mot de passe" className="border-2 border-gray-300 rounded-lg w-full p-2 mt-2 font-bold" />
        </div>
    </div>
    );
}