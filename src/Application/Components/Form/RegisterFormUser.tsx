import React, { Dispatch, useState } from "react";
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Définitions des types pour les props
type RegisterFormUserProps = {
  setIsLoging: Dispatch<React.SetStateAction<boolean>>;
};

export const RegisterFormUser: React.FC<RegisterFormUserProps> = ({
  setIsLoging,
}) => {
  // États pour stocker les valeurs du formulaire
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // État pour suivre l'étape actuelle
  const [step, setStep] = useState(1);

  // Fonction pour gérer le passage à l'étape suivante
  const handleNextStep = () => {
    // Vérifiez que les champs nécessaires sont remplis avant de passer à l'étape suivante
    if (firstname && lastname && email && phoneNumber) {
      setStep(2);
    } else {
      alert("Veuillez remplir tous les champs avant de continuer.");
    }
  };

  // Fonction pour gérer la soumission du formulaire final
  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    // Simulez une requête d'inscription ici
    console.log("Inscription:", {
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
    });

    // Réinitialisez le formulaire après l'inscription
    setFirstname("");
    setLastname("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
    setStep(1);

    alert("Inscription réussie !");
    setIsLoging(true); // Retour à la connexion après l'inscription
  };

  // Gestion de la visibilité des mots de passe
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Validation des conditions du mot de passe
  const isLongEnough = password.length >= 6;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const passwordsMatch = password === confirmPassword;

  return (
    <div className="flex flex-col justify-center items-center pt-5 pb-5 bg-white w-80 transition-all duration-500">
      {step === 1 && (
        <>
          <h1 className="text-center text-xl font-bold">Inscription rapide</h1>
          <h2 className="text-center text-sm pt-5 w-3/4">
            Créer un compte vous permet de réserver facilement une table dans
            votre restaurant
          </h2>
          <form className="flex flex-col justify-center items-center mt-8">
            <div className="flex flex-col w-4/4">
              <label htmlFor="firstName" className="font-bold items-left">
                Prénom :
              </label>
              <input
                value={firstname}
                onChange={(e) => setFirstname(e.currentTarget.value)}
                type="text"
                id="firstName"
                name="firstName"
                placeholder="François"
                className="border-2 border-gray-300 rounded-lg w-4/4 p-2 mt-2 mb-4 font-bold"
              />
            </div>
            <div className="flex flex-col w-4/4">
              <label htmlFor="lastName" className="font-bold">
                Nom :
              </label>
              <input
                value={lastname}
                onChange={(e) => setLastname(e.currentTarget.value)}
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Dupont"
                className="border-2 border-gray-300 rounded-lg w-4/4 p-2 mt-2 mb-4 font-bold"
              />
            </div>

            <div className="flex flex-col w-4/4">
              <label htmlFor="email" className="font-bold">
                Adresse mail :
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                type="email"
                id="email"
                name="email"
                placeholder="f.dupont@gmail.com"
                className="border-2 border-gray-300 rounded-lg w-4/4 p-2 mt-2 mb-4 font-bold"
              />
            </div>

            <div className="flex flex-col w-4/4">
              <label htmlFor="phone_number" className="font-bold">
                N° de téléphone :
              </label>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                type="tel"
                id="phone_number"
                name="phone_number"
                placeholder="Exemple : 0102030405"
                className="border-2 border-gray-300 rounded-lg w-4/4 p-2 mt-2 mb-4 font-bold"
              />
            </div>

            <div className="w-3/4 text-center">
              <input type="checkbox" name="cgu" id="cgu" className="mr-2" />
              <span className="text-sm">
                J'accepte les{" "}
                <a
                  href="/conditions"
                  target="_blank"
                  className="text-black font-bold hover:text-green-700"
                >
                  conditions d'utilisation
                </a>
              </span>
            </div>

            <button
              onClick={handleNextStep}
              type="button"
              className="bg-black rounded-lg text-white py-2 px-5 w-4/4 mt-6 mb-4 font-bold text-sm"
            >
              Créer un mot de passe
            </button>
          </form>
          <div className="w-3/4 text-center">
            <button
              onClick={() => setIsLoging(true)}
              className="hover:text-black hover:underline text-sm"
            >
              Vous avez déjà un compte ? Connectez-vous
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="text-center text-xl font-bold">Créez votre mot de passe</h1>
          <h2 className="text-center text-sm pt-5 w-3/4">
            Assurez-vous que le mot de passe saisi respecte les conditions mentionnées plus bas
          </h2>
          <form className="flex flex-col justify-center items-center mt-8">
            <div className="flex flex-col w-4/4 relative">
              <label htmlFor="password" className="font-bold items-left mb-1">
                Mot de passe
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Saisissez un mot de passe"
                className="border-2 border-gray-300 rounded-lg w-full p-2 font-bold pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-11"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex flex-col w-4/4 relative">
              <label htmlFor="confirmPassword" className="font-bold mb-1 mt-3">
                Confirmez le mot de passe
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirmez le mot de passe"
                className="border-2 border-gray-300 rounded-lg w-full p-2 font-bold pr-10"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-2 top-14"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="text-left mb-4">
              <p className="font-bold mb-1 mt-4">Le mot de passe doit contenir :</p>
              <ul className="text-sm">
                <li className="flex items-center">
                  {isLongEnough ? (
                    <FaCheckCircle className="text-green-800 mr-2" />
                  ) : (
                    <FaTimesCircle className="text-gray-300 mr-2" />
                  )}
                  Au moins 6 caractères
                </li>
                <li className="flex items-center">
                  {hasNumber ? (
                    <FaCheckCircle className="text-green-800 mr-2" />
                  ) : (
                    <FaTimesCircle className="text-gray-300 mr-2" />
                  )}
                  Un chiffre
                </li>
                <li className="flex items-center">
                  {hasSpecialChar ? (
                    <FaCheckCircle className="text-green-800 mr-2" />
                  ) : (
                    <FaTimesCircle className="text-gray-300 mr-2" />
                  )}
                  Un caractère spécial
                </li>
                <li className="flex items-center">
                  {hasUpperCase ? (
                    <FaCheckCircle className="text-green-800 mr-2" />
                  ) : (
                    <FaTimesCircle className="text-gray-300 mr-2" />
                  )}
                  Une majuscule
                </li>
              </ul>
            </div>

            <button
              onClick={handleSubmit}
              type="button"
              disabled={
                !isLongEnough ||
                !hasNumber ||
                !hasSpecialChar ||
                !hasUpperCase ||
                !passwordsMatch
              }
              className={`${
                isLongEnough &&
                hasNumber &&
                hasSpecialChar &&
                hasUpperCase &&
                passwordsMatch
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-400 cursor-not-allowed"
              } rounded-lg py-2 px-5 w-3/4 mt-4 font-bold text-sm`}
            >
              Terminer l'inscription
            </button>
          </form>
          <div className="w-full text-center mt-4">
            <button
              onClick={() => setStep(1)} // Permet de revenir à l'étape précédente
              className="hover:text-black hover:underline text-sm"
            >
              Revenir à l'étape précédente
            </button>
          </div>
        </>
      )}
    </div>
  );
};
