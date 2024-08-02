import { ChangeEvent, FormEvent, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react';

export const RegisterPage = () => {
  useEffect(() => {
    document.title = 'Oresto - Créer un compte professionnel'; 
  }, []); 
  
    // États pour les champs de formulaire
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);
  
    // Gestionnaire d'événement pour la case à cocher
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
      setIsCheckboxChecked(event.target.checked);
    };
  
    // Vérification si tous les champs sont remplis
    const isFormValid =
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      password === confirmPassword &&
      isCheckboxChecked;
  
    // Fonction pour gérer le changement des champs d'entrée
    const handleInputChange = (
      event: ChangeEvent<HTMLInputElement>,
      setState: React.Dispatch<React.SetStateAction<string>>
    ) => {
      setState(event.target.value);
    };
  
    // Gestionnaire de soumission du formulaire
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!isFormValid) {
        alert('Veuillez remplir tous les champs correctement.');
        return;
      }
  
      alert('Inscription réussie !');
      // Vous pouvez envoyer les données du formulaire au serveur ici
    };
  
  return (
    <div className='w-full h-screen flex'>
      <div className='w-6/12 bg-light'>
        
      <div className="flex flex-col items-center justify-center h-screen">
      <a href="/login">
        <img src="../../../public/img/logo-oresto-red.png" width="300px" alt="Logo Oresto" />
      </a>

      <form method="POST" className="flex flex-col mt-10" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="flex flex-col">
            <label className="text-lg font-bold mb-2">Prénom :</label>
            <input
              type="text"
              name="firstName"
              placeholder="Exemple : John"
              value={firstName}
              onChange={(e) => handleInputChange(e, setFirstName)}
              className={`border-2 p-2 mb-6 font-bold ${
                firstName.trim() !== '' ? 'border-green-500' : 'border-gray-300'
              }`}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-bold mb-2">Nom :</label>
            <input
              type="text"
              name="lastName"
              placeholder="Exemple : Doe"
              value={lastName}
              onChange={(e) => handleInputChange(e, setLastName)}
              className={`border-2 p-2 mb-6 font-bold ${
                lastName.trim() !== '' ? 'border-green-500' : 'border-gray-300'
              }`}
            />
          </div>
        </div>

        <label className="text-lg font-bold mb-2">Adresse mail</label>
        <input
          type="email"
          name="email"
          placeholder="Exemple : mail@monrestaurant.fr"
          value={email}
          onChange={(e) => handleInputChange(e, setEmail)}
          className={`border-2 p-2 mb-6 font-bold ${
            email.trim() !== '' ? 'border-green-500' : 'border-gray-300'
          }`}
        />

        <label className="text-lg font-bold mb-2">Mot de passe</label>
        <input
          type="password"
          name="password"
          placeholder="Saisissez un mot de passe"
          value={password}
          onChange={(e) => handleInputChange(e, setPassword)}
          className={`border-2 p-2 mb-4 font-bold ${
            password.trim() !== '' ? 'border-green-500' : 'border-gray-300'
          }`}
        />

        <label className="text-lg font-bold mb-2">Confirmer le mot de passe</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmez le mot de passe"
          value={confirmPassword}
          onChange={(e) => handleInputChange(e, setConfirmPassword)}
          className={`border-2 p-2 mb-2 font-bold ${
            confirmPassword.trim() !== '' && password === confirmPassword
              ? 'border-green-500'
              : 'border-gray-300'
          }`}
        />

        <div className="flex flex-col items-center justify-center">
          <div className="my-4">
            <input
              type="checkbox"
              name="cgu"
              id="cgu"
              className="mr-2"
              checked={isCheckboxChecked}
              onChange={handleCheckboxChange}
            />
            J'accepte les{' '}
            <a href="/conditions" target='_blank' className="text-black font-bold">
              conditions d'utilisation
            </a>
          </div>

          <button
            type="submit"
            className={`bg-black text-white py-4 rounded-lg w-2/3 font-bold uppercase ${
              isFormValid ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
            }`}
            disabled={!isFormValid}
          >
            Terminer l'inscription
          </button>
        </div>
      </form>
    <div className="pt-4">
      <NavLink to="/login">Déjà un compte ? Connectez-vous</NavLink></div>
    </div>

      </div>
      <div className='cover-login w-6/12'>
      </div>
    </div>
  )
}