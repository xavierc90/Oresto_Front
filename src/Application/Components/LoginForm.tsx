import { NavLink } from 'react-router-dom';

export const LoginForm = () => {

  return (
    <div className="flex flex-col items-center justify-center items-center h-screen">
      <img src="../../../public/img/logo-oresto-red.png" width="350px" alt="Logo Oresto" />
      <form className="flex flex-col w-80 mt-10" method='post' action='/dashboard'>
        <label className="text-lg font-bold mb-4">Adresse mail ou identifiant</label>
        <input type="text" name="login" placeholder="Saisissez votre email ou identifiant" className="border-2 border-gray-300 p-2 mb-6 font-bold" />
        <label className="text-lg font-bold mb-4">Mot de passe</label>
        <input type="password" name="password" placeholder="Saisissez votre mot de passe" className="border-2 border-gray-300 p-2 mb-10 font-bold" />
        <div className="flex gap-2">
        <button type="submit" className="bg-red-500 text-white p-4 rounded-lg w-2/4 font-bold uppercase">Se connecter</button>
        <NavLink to="/register" className="bg-black text-white text-center p-4 rounded-lg w-2/4 font-bold uppercase no-underline">S'inscrire</NavLink>
        </div></form>
        <div className='mt-10'>
          <NavLink to="/lostpassword">J'ai oublié mon mot de passe</NavLink></div>
        <div className='mt-4'><a href="/conditions" target='_blank'>Conditions générales d'utilisation</a></div>
    </div>
  )
}
