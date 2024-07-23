import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simuler une vérification d'identifiant
    if (login === 'admin' && password === 'password') {
        // Stocker l'état de connexion (peut-être dans localStorage)
        localStorage.setItem('isAuthenticated', 'true');

        // Rediriger vers le tableau de bord
        navigate('/dashboard');
    } else {
        alert('Identifiant ou mot de passe incorrect');
    }
};

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="../../../public/img/logo-oresto-red.png" width="400px" alt="Logo Oresto" />
      <form onSubmit={handleLogin} className="flex flex-col w-80 mt-10">
        <label className="text-xl font-bold mb-4">Adresse mail ou identifiant</label>
        <input type="text" name="login" placeholder="Nom d'utilisateur" className="border-2 border-gray-300 p-2 mb-6 font-bold" />
        <label className="text-xl font-bold mb-4">Mot de passe</label>
        <input type="password" name="password" placeholder="Mot de passe" className="border-2 border-gray-300 p-2 mb-10 font-bold" />
        <div className="flex gap-2">
        <button type="submit" className="bg-red-500 text-white p-4 rounded-lg w-2/4 font-bold uppercase">Se connecter</button>
        <button className="bg-black text-white p-2 rounded-lg w-2/4 font-bold uppercase">S'inscrire</button>
        </div></form>
    </div>
  )
}
