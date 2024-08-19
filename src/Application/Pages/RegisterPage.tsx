import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Module/Auth/auth.hook'; // Ensure you import useAuth properly
import { http } from '../../Infrastructure/Http/axios.instance';
import { AxiosError } from 'axios';

export const RegisterPage = () => {
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(event.target.checked);
  };

  interface ErrorResponse {
    message: string;
  }

  const isFormValid = firstName.trim() !== '' &&
                      lastName.trim() !== '' &&
                      email.trim() !== '' &&
                      phoneNumber.trim() !== '' &&
                      password.trim() !== '' &&
                      confirmPassword.trim() !== '' &&
                      password === confirmPassword &&
                      isCheckboxChecked;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
    setState(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) {
      setErrorMessage("Veuillez remplir tous les champs correctement.");
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
      const registerResponse = await http.post('/register_manager', managerData);
      if (registerResponse.status === 201) {
        const loginResponse = await http.post('/login_manager', { email, password });
        if (loginResponse.status === 200 && loginResponse.data.token) {
          login(loginResponse.data.token, loginResponse.data._id); // Handling login
          alert('Inscription et connexion réussies !');
          navigate('/register_company');
        } else {
          setErrorMessage('Une erreur est survenue lors de la connexion.');
        }
      } else {
        setErrorMessage('Une erreur est survenue lors de l\'inscription');
      }
    } catch (error: unknown) {
      const e = error as AxiosError<ErrorResponse>; // Spécification du type de données attendues dans la réponse
      if (e.response && e.response.data) {
        setErrorMessage(e.response.data.message || 'Une erreur réseau est survenue');
      } else {
        setErrorMessage("Erreur réseau ou serveur non atteignable");
      }
      console.error('Erreur lors de l\'inscription ou de la connexion:', e);
    }
  }

  return (
    <div className='w-full h-screen flex'>
      <div className='cover-register w-6/12'></div>
      <div className='w-6/12 bg-light'>
        <div className="flex flex-col items-center justify-center h-screen">
          <a href="/login">
            <img src="../../../public/img/logo-oresto-red.png" width="300px" alt="Logo Oresto" />
          </a>
          
          {errorMessage && (
            <div className="text-red-500 text-center pt-4">{errorMessage}</div>
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
                confirmPassword.trim() !== '' && password === confirmPassword ? 'border-green-500' : 'border-gray-300'
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
                <a href="#" className="text-black font-bold">
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
