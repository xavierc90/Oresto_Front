import React, { useState, useEffect } from 'react';
import { http } from '../../../../Infrastructure/Http/axios.instance';
import { useAuth } from '../../../../Module/Auth/useAuth';

type AllergensProps = {
  onReturnToAccount: () => void;
};

const allergensList = [
  { id: 'Gluten', label: 'Gluten', description: 'Blé, Orge, Seigle, Avoine, Épeautre, Kamut' },
  { id: 'Lait', label: 'Lactose', description: 'Lait et produits laitiers' },
  { id: 'Œufs', label: 'Œufs', description: 'Œufs de poule et produits dérivés' },
  { id: 'Noix', label: 'Fruits à coque', description: 'Amandes, Noisettes, Noix de cajou, Noix de pécan...' },
  { id: 'Arachides', label: 'Arachides', description: 'Cacahuètes et produits dérivés' },
  { id: 'Poisson', label: 'Poissons', description: 'Toutes les espèces' },
  { id: 'Crustacés', label: 'Crustacés', description: 'Crevettes, Crabes, Langoustines, Homards' },
];

export const Allergens: React.FC<AllergensProps> = ({ onReturnToAccount }) => {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Utiliser useAuth pour récupérer les informations de l'utilisateur connecté
  const { user, token, updateUser } = useAuth();  // updateUser sera utilisé pour mettre à jour les informations de l'utilisateur

  // Initialiser les allergènes sélectionnés avec ceux du user connecté
  useEffect(() => {
    if (user?.allergens) {
      setSelectedAllergens(user.allergens);  // Si les allergènes existent, on les initialise
    }
  }, [user]);

  const handleAllergenChange = (id: string) => {
    setSelectedAllergens(prevState =>
      prevState.includes(id)
        ? prevState.filter(allergen => allergen !== id)
        : [...prevState, id]
    );
  };

  const handleSaveChanges = async () => {
    console.log("Selected allergens:", selectedAllergens);

    if (!user || !token) {
      console.error("User or token not available");
      return;
    }

    try {
      const response = await http.put(
        `/update_user/${user._id}`,  // Utilisation dynamique de l'ID de l'utilisateur
        { allergens: selectedAllergens },
        {
          headers: {
            Authorization: `Bearer ${token}`  // Utilisation dynamique du token
          }
        }
      );
      console.log("Update response:", response.data);
      
      // Mise à jour des allergènes dans le contexte utilisateur
      updateUser({ ...user, allergens: selectedAllergens });

      setSuccessMessage("Vos préférences ont été mises à jour");
    } catch (error) {
      console.error("Error updating allergens:", error);
    }
  };

  return (
    <div className="flex flex-col mt-12 lg:mt-0 justify-center items-center overflow-y-auto h-full bg-white">
      <h2 className="text-3xl mt-12 lg:mt-0 lg:text-xl font-bold mb-4">Mes préférences</h2>

      <p className="text-gray-600 text-center text-lg font-semibold lg:font-normal lg:text-base mb-4">
        Mentionner vos allergies permet une meilleure prise en charge de vos réservations
      </p>

      <div className="w-full lg:max-h-60 my-0 lg:my-4 lg:m-2 overflow-y-auto px-4">
        <ul className="text-left w-full lg:text-base">
          {allergensList.map(allergen => (
            <li key={allergen.id} className="mb-4 lg:text-base">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedAllergens.includes(allergen.id)}
                  onChange={() => handleAllergenChange(allergen.id)}
                />
                <span>
                  <span className="font-semibold text-xl lg:text-base">{allergen.label}</span> <br />
                  <span className="text-sm text-gray-500 text-xl lg:text-sm">{allergen.description}</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>


      {successMessage && (
        <p className="mt-4 lg:mt-0 text-lg lg:text-sm font-bold text-green-800 lg:w-[300px] mb-4 lg:mb-0 text-center">{successMessage}</p>
      )}
      
      <button 
        className="bg-green-800 text-white py-2 px-4 rounded-lg text-lg lg:text-sm font-semibold lg:mt-4"
        onClick={handleSaveChanges}
      >
        Enregistrer les modifications
      </button>

      <div className="mt-2 w-full text-center">
        <button
          className="bg-black text-white py-2 px-4 rounded-lg text-lg lg:text-sm font-semibold"
          onClick={onReturnToAccount}
        >
          Retour à l’accueil
        </button>
      </div>
    </div>
  );
};