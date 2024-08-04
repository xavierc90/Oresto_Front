import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { http } from '../../Infrastructure/Http/axios.instance';

export const RegisterPage = () => {
  useEffect(() => {
    document.title = 'Oresto - Créer un compte professionnel';
  }, []);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(event.target.checked);
  };

  const isFormValid =
    firstName.trim() !== '' &&
    lastName.trim() !== '' &&
    email.trim() !== '' &&
    phoneNumber.trim() !== '' &&
    password.trim() !== '' &&
    confirmPassword.trim() !== '' &&
    password === confirmPassword &&
    isCheckboxChecked;

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) {
      setErrorMessage('Veuillez remplir tous les champs correctement.');
      return;
    }

    const managerData = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      phone_number: phoneNumber,
      password: password,
    };

    try {
      // Ajouter le manager
      const registerResponse = await http.post('/register_manager', managerData, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });

      if (registerResponse.status === 201) { // Modifié pour vérifier le statut 201
        // Connexion automatique après l'inscription
        const loginResponse = await http.post('/login_manager', {
          email: email,
          password: password,
        }, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });

        if (loginResponse.status === 200) {
          // Enregistrer le token et rediriger
          localStorage.setItem('token', loginResponse.data.token);
          localStorage.setItem('userId', loginResponse.data._id); // Stocker l'ID utilisateur
          alert('Inscription et connexion réussies !');
          navigate('/register_company'); // Redirige vers la page de création d'entreprise
        } else {
          setErrorMessage('Une erreur est survenue lors de la connexion.');
        }
      } else {
        setErrorMessage('Une erreur est survenue lors de l\'inscription.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 405 && error.response.data.type_error === "duplicate") {
          setErrorMessage('L\'adresse e-mail est déjà utilisée.');
        } else if (error.response?.status === 405 && error.response.data.type_error === "validator") {
          setErrorMessage('Veuillez remplir tous les champs correctement.');
        } else {
          setErrorMessage('Une erreur est survenue lors de l\'inscription ou de la connexion.');
        }
      } else {
        setErrorMessage('Une erreur est survenue lors de l\'inscription ou de la connexion.');
      }
      console.error('Erreur lors de l\'inscription ou de la connexion:', error);
    }
  };

  return (
    <div className='w-full h-screen flex'>
      <div className='cover-register w-6/12'>
      </div>
      <div className='w-6/12 bg-light'>
        <div className="flex flex-col items-center justify-center h-screen">
          <a href="/login">
            <img src="../../../public/img/logo-oresto-red.png" width="300px" alt="Logo Oresto" />
          </a>
          
          {errorMessage && (
                <div className="text-red-500 text-center pt-4">
                  {errorMessage}
                </div>
              )}

          <form method="POST" className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex gap-4 pt-10">
              <div className="flex flex-col">
                <label className="text-lg font-bold mb-2 text-sm">Prénom :</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Exemple : John"
                  value={firstName}
                  onChange={(e) => handleInputChange(e, setFirstName)}
                  className={`border-2 p-2 mb-6 font-bold text-sm ${
                    firstName.trim() !== '' ? 'border-green-500' : 'border-gray-300'
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-bold mb-2 text-sm">Nom :</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Exemple : Doe"
                  value={lastName}
                  onChange={(e) => handleInputChange(e, setLastName)}
                  className={`border-2 p-2 mb-6 font-bold text-sm ${
                    lastName.trim() !== '' ? 'border-green-500' : 'border-gray-300'
                  }`}
                />
              </div>
            </div>

            <label className="text-lg font-bold mb-2 text-sm">Adresse mail</label>
            <input
              type="email"
              name="email"
              placeholder="Exemple : mail@monrestaurant.fr"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
              className={`border-2 p-2 mb-6 font-bold text-sm ${
                email.trim() !== '' ? 'border-green-500' : 'border-gray-300'
              }`}
            />

            <label className="text-lg font-bold mb-2 text-sm">Numéro de téléphone</label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Exemple : 0612345678"
              value={phoneNumber}
              onChange={(e) => handleInputChange(e, setPhoneNumber)}
              className={`border-2 p-2 mb-6 font-bold text-sm ${
                phoneNumber.trim() !== '' ? 'border-green-500' : 'border-gray-300'
              }`}
            />

            <label className="text-lg font-bold mb-2 text-sm">Mot de passe</label>
            <input
              type="password"
              name="password"
              placeholder="Saisissez un mot de passe"
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
              className={`border-2 p-2 mb-4 font-bold text-sm ${
                password.trim() !== '' ? 'border-green-500' : 'border-gray-300'
              }`}
            />

            <label className="text-lg font-bold mb-2 text-sm">Confirmer le mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmez le mot de passe"
              value={confirmPassword}
              onChange={(e) => handleInputChange(e, setConfirmPassword)}
              className={`border-2 p-2 mb-2 font-bold text-sm ${
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
                className={`bg-black text-white py-4 rounded-lg px-5 font-bold uppercase ${
                  isFormValid ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                }`}
                disabled={!isFormValid}
              >
                Continuer l'inscription
              </button>
            </div>
          </form>
          <div className="pt-4">
            <NavLink to="/login">Déjà un compte ? Connectez-vous</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
