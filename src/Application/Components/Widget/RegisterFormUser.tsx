import { NavLink } from 'react-router-dom';

export const RegisterFormUser = () => {
    return (
      <div className="flex flex-col justify-center items-center pt-5 pb-5 bg-white">
        <h1 className="text-center text-xl font-bold">Inscription rapide</h1>
          <form className="flex flex-col justify-center items-center mt-8">
              <div className="flex flex-col w-4/4">
                  <label htmlFor="firstName" className="font-bold items-left">Prénom :</label>
                  <input type="text" id="firstName" name="firstName" placeholder="François" className="border-2 border-gray-300 rounded-lg w-4/4 p-2 mt-2 mb-4 font-bold" />
              </div>
              <div className="flex flex-col w-4/4">
                  <label htmlFor="lastName" className="font-bold">Nom :</label>
                  <input type="text" id="lastName" name="lastName" placeholder="Dupont" className="border-2 border-gray-300 rounded-lg w-4/4 p-2 mt-2 mb-4 font-bold"/>
              </div>

              <div className="flex flex-col w-4/4">
                  <label htmlFor="email" className="font-bold">Adresse mail :</label>
                  <input type="text" id="email" name="email" placeholder="f.dupont@gmail.com" className="border-2 border-gray-300 rounded-lg w-4/4 p-2 mt-2 mb-4 font-bold"/>
              </div>

              <div className="flex flex-col w-4/4">
                  <label htmlFor="phone_number" className="font-bold">N° de téléphone :</label>
                  <input type="text" id="phone_number" name="phone_number" placeholder="Exemple : 0102030405" className="border-2 border-gray-300 rounded-lg w-4/4 p-2 mt-2 mb-4 font-bold"/>
              </div>
              
          <div className="w-3/4 text-center">
            <input
              type="checkbox"
              name="cgu"
              id="cgu"
              className="mr-2"
            />
            J'accepte les{' '}
            <a href="/conditions" target='_blank' className="text-black font-bold">
              conditions d'utilisation
            </a>
          </div>

              <button type="submit" className="bg-black rounded-lg text-white py-2 w-3/4 mt-6 mb-4 font-bold">Créer un mot de passe</button>
          </form>
          <div className="w-3/4 text-center">
      <NavLink to="/login" className="hover:text-black hover:underline">Vous avez déjà un compte ? Connectez-vous</NavLink></div>
    </div>
    )
  }