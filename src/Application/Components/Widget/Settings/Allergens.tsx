import React, { useState } from 'react';
import { http } from '../../../../Infrastructure/Http/axios.instance';

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

  const userId = "66d6c8ed1762cac42c20d8de"; // Remplacez par l'ID de l'utilisateur connecté
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ2YzhlZDE3NjJjYWM0MmMyMGQ4ZGUiLCJpYXQiOjE3MjUzNTYyMzgsImV4cCI6MTcyNTM2MzQzOH0.ojPDS3x9bSwiLFPiZCnAbXjCKVgW2pGtCCHUwb1jBPM"; // Remplacez par le token de l'utilisateur

  const handleAllergenChange = (id: string) => {
    setSelectedAllergens(prevState =>
      prevState.includes(id)
        ? prevState.filter(allergen => allergen !== id)
        : [...prevState, id]
    );
  };

  const handleSaveChanges = async () => {
    console.log("Selected allergens:", selectedAllergens);

    try {
      const response = await http.put(
        `/update_user/${userId}`,
        { allergens: selectedAllergens },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("Update response:", response.data);
      setSuccessMessage("Vos préférences ont été mises à jour");
    } catch (error) {
      console.error("Error updating allergens:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <h2 className="text-xl font-bold mb-4">Mes préférences</h2>
      <p className="text-gray-600 text-center mb-4">
        Mentionner vos allergies permet une meilleure prise en charge de vos réservations
      </p>

      <div className="w-full lg:max-h-60 my-0 lg:my-4 lg:m-2 overflow-y-auto px-4">
        <ul className="text-left w-full">
          {allergensList.map(allergen => (
            <li key={allergen.id} className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedAllergens.includes(allergen.id)}
                  onChange={() => handleAllergenChange(allergen.id)}
                />
                <span>
                  <span className="font-semibold">{allergen.label}</span> <br />
                  <span className="text-sm text-gray-500">{allergen.description}</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {successMessage && (
        <p className="mt-4 lg:mt-0 text-green-800 lg:w-[200px] mb-4 lg:mb-0 text-center">{successMessage}</p>
      )}

      <button 
        className="bg-green-800 text-white py-2 px-4 rounded-lg text-sm font-semibold lg:mt-4"
        onClick={handleSaveChanges}
      >
        Enregistrer les modifications
      </button>

      <div className="mt-2 w-full text-center">
        <button
          className="bg-black text-white py-2 px-4 rounded-lg text-sm font-semibold"
          onClick={onReturnToAccount}
        >
          Retour à l’accueil
        </button>
      </div>
    </div>
  );
};
