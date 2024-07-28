import { useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { http } from '../../Infrastructure/Http/axios.instance';
import { useAuth } from '../../Module/Auth/auth.hook';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // État pour stocker le message d'erreur
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Oresto - Se connecter'; 
  }, []); 
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    console.log({ email, password });

    try {
      const response = await http.post('/login', { email, password });
      const { token } = response.data;

      // Enregistrez le token et mettez à jour l'état d'authentification
      loginUser(token);

      // Redirigez l'utilisateur vers le tableau de bord
      navigate('/dashboard/bookings');
    } catch (error: unknown) {
      console.error('Erreur de connexion:', error);

      if (error instanceof Error) {
        // Si l'erreur est une instance d'Error, vérifiez si elle contient une réponse HTTP
        if ((error as any).response && (error as any).response.data && (error as any).response.data.type_error === 'no-valid-login') {
          setError('Identifiant ou mot de passe incorrect');
        } else {
          setError('Une erreur est survenue. Veuillez réessayer.');
        }
      }
    }
  };

  return (
    <div className='w-full h-screen flex'>
      <div className='w-6/12 bg-light'>
        <div className="flex flex-col w-400 items-center justify-center h-screen">
          <img src="../../../public/img/logo-oresto-red.png" width="350px" alt="Logo Oresto" />
          <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4 text-center font-bold">{error}</div>} {/* Affichage du message d'erreur */}
            <label className="text-xl font-bold mb-4">Adresse mail</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Saisissez votre email" 
              className="border-2 border-gray-300 p-2 mb-6 font-bold" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-xl font-bold mb-4">Mot de passe</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Saisissez votre mot de passe" 
              className="border-2 border-gray-300 p-2 mb-10 font-bold" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-black text-white p-4 rounded-lg font-bold uppercase">Se connecter</button>
              <NavLink to="/register" className="bg-red-500 text-white text-center p-4 rounded-lg font-bold uppercase no-underline hover:text-white">Créer un compte</NavLink>
            </div>
          </form>
          <div className='mt-10'>
            <NavLink to="/lostpassword">J'ai oublié mon mot de passe</NavLink>
          </div>
          <div className='mt-4'>
            <a href="/conditions" target='_blank'>Conditions générales d'utilisation</a>
          </div>
        </div>
      </div>
      <div className='cover-login w-6/12'></div>
    </div>
  );
};