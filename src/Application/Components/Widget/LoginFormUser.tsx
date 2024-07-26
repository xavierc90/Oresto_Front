import React, { Dispatch } from 'react'

export const LoginFormUser: React.FC<{setIsLoging: Dispatch<React.SetStateAction<boolean>>}> = ({setIsLoging}) => {
  return (
    <div className="flex flex-col justify-center items-center pt-5 pb-5 px-6 bg-white">
        <img src="../../../public/img/logo-oresto-orange.png" width="250px" alt="Logo Oresto" />
        <form className="flex flex-col justify-center items-center mt-8">
            <div className="flex flex-col w-4/4">
                <label htmlFor="email" className="font-bold items-left">Adresse mail</label>
                <input type="email" id="email" name="email" placeholder="john.doe@gmail.com" className="border-2 border-gray-300 rounded-lg w-4/4 p-2 mt-2 mb-4 font-bold" />
            </div>
            <div className="flex flex-col w-4/4">
                <label htmlFor="password" className="font-bold">Mot de passe</label>
                <input type="password" id="password" name="password" placeholder="Votre mot de passe" className="border-2 border-gray-300 rounded-lg w-4/4 p-2 mt-2 font-bold"/>
            </div>
            <button type="submit" className="bg-black rounded-lg text-white py-2 w-3/4 mt-6 mb-4 font-bold">Se connecter</button>
        <a href="#" className="hover:text-black">J'ai oublié mon mot de passe</a>
        </form>
        <button
            className="bg-green-800 rounded-lg text-white py-2 w-3/4 text-center mt-4 font-bold hover:text-white"
            onClick={() => setIsLoging(false)}>Créer un compte
        </button>
        
        <div>bonjour ...</div>
</div>
  )
}
