import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { http } from '../../Infrastructure/Http/axios.instance';
import { useAuth } from '../../Module/Auth/useAuth';

export const LoginPage = () => {
  
  useEffect(() => {
    document.title = 'Oresto - Page de connexion';
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth(); 
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await http.post('/login_manager', { email, password });

      if (response.data.token) {
        const user = response.data; 
        const restaurantArray = response.data.restaurant; 
        const token = response.data.token;

        // Vérifier si le tableau restaurant contient au moins un objet avec un `_id`
        const hasValidRestaurant = Array.isArray(restaurantArray) && restaurantArray.some((restaurant: any) => restaurant._id);

        login(user, restaurantArray, token); // Connexion de l'utilisateur avec toutes les informations nécessaires

        if (!hasValidRestaurant) {
          // Si l'utilisateur n'a pas de société valide, rediriger vers la page de création de société
          navigate('/register_restaurant');
        } else {
          // Sinon, rediriger vers la page des réservations
          navigate('/dashboard/reservations');
        }
      } else {
        setError('Erreur lors de la connexion. Veuillez réessayer.');
      }
    } catch (error: unknown) {
      setError('Identifiant ou mot de passe incorrect');
    }
  };

  return (
    <div className='w-full h-screen flex'>
      <div className='w-6/12 bg-light'>
        <div className="flex flex-col w-400 items-center justify-center h-screen">
          <img src="../../../public/img/logo-oresto-red.png" width="350px" alt="Logo Oresto" className='mb-10' />
          {error && (
            <div
              className="text-red-500 mb-8 text-center font-bold"
              dangerouslySetInnerHTML={{ __html: error }}
            />
          )}
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="text-xl font-bold mb-4" htmlFor='email'>Adresse mail</label>
            <input
              type="text"
              name="email"
              id='email'
              placeholder="Saisissez votre email"
              className="border-2 border-gray-300 p-2 mb-6 font-bold"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-xl font-bold mb-4" htmlFor='password'>Mot de passe</label>
            <input
              type="password"
              name="password"
              id='password'
              placeholder="Saisissez votre mot de passe"
              className="border-2 border-gray-300 p-2 mb-10 font-bold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-black text-white p-4 rounded-lg font-bold uppercase">Se connecter</button>
              <NavLink to="/register" className="bg-red-600 text-white text-center p-4 rounded-lg font-bold uppercase no-underline hover:text-white">Créer un compte</NavLink>
            </div>
          </form>
          <div className='mt-10'>
            <NavLink to="/lostpassword" className={'underline'}>J'ai oublié mon mot de passe</NavLink>
          </div>
          <div className='mt-4'>
            <a href="/conditions" target='_blank' className='underline'>Conditions générales d'utilisation</a>
          </div>
        </div>
      </div>
      <div className='cover-login w-6/12'></div>
    </div>
  );
};
