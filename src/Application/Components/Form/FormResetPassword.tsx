import React, { Dispatch, useState } from 'react';

type FormResetPasswordProps = {
  setIsLostPassword: Dispatch<React.SetStateAction<boolean>>;
  setIsLoging: Dispatch<React.SetStateAction<boolean>>;
};

export const FormResetPassword: React.FC<FormResetPasswordProps> = ({
  setIsLostPassword,
  setIsLoging,
}) => {
  const [email, setEmail] = useState('');

  const handleBackToLogin = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    event.preventDefault();
    setIsLostPassword(false); // Retourne à l'écran de connexion
  };

  const handleSignUpClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsLostPassword(false); // Assurez-vous que l'écran de réinitialisation de mot de passe est caché
    setIsLoging(false); // Affiche le formulaire d'inscription
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email); // Affiche l'adresse email dans la console
  };

  return (
    <div className="flex flex-col justify-center items-center pt-5 pb-5 px-6 bg-white w-80">
      <h1 className="text-center text-xl font-bold">Mot de passe perdu ?</h1>
      <h2 className="w-full text-center text-sm pt-5">
        Renseignez votre adresse pour recevoir un mail et réinitialiser votre mot de passe
      </h2>
      <form className="flex flex-col justify-center items-center mt-4" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full">
          <label htmlFor="email" className="font-bold items-left">
            Adresse mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Saisissez votre adresse mail"
            className="border-2 border-gray-300 rounded-lg w-full p-2 mt-2 mb-4 font-bold"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button
          type="submit"
          className={`rounded-lg text-white py-2 px-4 mt-2 mb-4 font-bold text-sm ${email ? 'bg-black' : 'bg-gray-300'}`}
          disabled={!email}
        >
          Réinitialiser le mot de passe
        </button>

        <a
          href="#"
          onClick={handleSignUpClick}
          className="hover:text-black hover:underline cursor-pointer text-center text-sm w-3/4"
        >
          Vous n'avez pas de compte ? Inscrivez-vous
        </a>

        <a
          href="#"
          onClick={handleBackToLogin}
          className="hover:text-black hover:underline cursor-pointer mt-4 text-sm"
        >
          Retour à l'accueil
        </a>
      </form>
    </div>
  );
};
