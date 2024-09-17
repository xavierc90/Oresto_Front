import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Restaurant } from '../../Module/Types/restaurant.type';
import { useDarkMode } from '../../Module/Utils/darkMode';
import { http } from '../../Infrastructure/Http/axios.instance';
import { User } from '../../Module/Auth/user.type';
import { FaStore } from "react-icons/fa";
import { FaUser } from "react-icons/fa";



interface ContextType {
  user: User | null;
  restaurant: Restaurant | null;
}

interface Hour {
  opening: string;
  closing: string;
  _id: string;
}

interface OpeningHour {
  _id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  hours: Hour[];
}

const daysOfWeek: { [key in OpeningHour['day']]: string } = {
  Monday: 'Lundi',
  Tuesday: 'Mardi',
  Wednesday: 'Mercredi',
  Thursday: 'Jeudi',
  Friday: 'Vendredi',
  Saturday: 'Samedi',
  Sunday: 'Dimanche',
};

const englishDaysOrder: OpeningHour['day'][] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const defaultOpeningHours: OpeningHour[] = englishDaysOrder.map((day) => ({
  _id: day,
  day: day, // Le jour est en anglais
  hours: [
    { opening: '00:00', closing: '00:00', _id: '1' },
    { opening: '00:00', closing: '00:00', _id: '2' },
  ],
}));

export const SettingsPage = () => {
  const { restaurant, user } = useOutletContext<ContextType>();  // Ajout de `user` ici
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>(defaultOpeningHours);
  const [isEditing, setIsEditing] = useState(false);
  const [editedHours, setEditedHours] = useState<OpeningHour[]>(defaultOpeningHours);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    const fetchOpeningHours = async () => {
      if (restaurant?._id) {
        try {
          const response = await http.get(`/opening_hours/${restaurant._id}`);
          console.log('Restaurant id :' , restaurant);
          const fetchedHours: OpeningHour[] = response.data;

          if (fetchedHours.length === 0) {
            setOpeningHours(defaultOpeningHours);
            setEditedHours(defaultOpeningHours);
          } else {
            // Trier les horaires selon l'ordre des jours en anglais
            const sortedOpeningHours = fetchedHours.sort(
              (a, b) =>
                englishDaysOrder.indexOf(a.day) - englishDaysOrder.indexOf(b.day)
            );

            setOpeningHours(sortedOpeningHours);
            setEditedHours(sortedOpeningHours);
          }
        } catch (error: any) {
          console.error('Erreur lors de la récupération des horaires :', error);
          setErrorMessage('Erreur lors de la récupération des horaires');
          setSuccessMessage(null);
          setShowErrorMessage(true);
          setTimeout(() => setShowErrorMessage(false), 3500);
        }
      }
    };

    if (restaurant?._id) {
      fetchOpeningHours();
    }
  }, [restaurant?._id]);

  const handleInputChange = (
    dayId: string,
    hourId: string,
    field: string,
    value: string
  ) => {
    const updatedHours = editedHours.map((day) => {
      if (day.day === dayId) {
        return {
          ...day,
          hours: day.hours.map((hour) => {
            if (hour._id === hourId) {
              return { ...hour, [field]: value };
            }
            return hour;
          }),
        };
      }
      return day;
    });
    setEditedHours(updatedHours);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleUpdateClick = async () => {
    if (!restaurant?._id) {
      console.error("ID de l'entreprise manquant");
      setErrorMessage(
        "Erreur lors de la mise à jour des horaires : ID de l'entreprise manquant"
      );
      setSuccessMessage(null);
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3500);
      return;
    }

    try {
      // Les jours sont déjà en anglais, nous les envoyons tels quels
      const updatedData = editedHours.map((day) => ({
        day: day.day, // Day in English
        hours: day.hours.map((hour) => ({
          opening: hour.opening,
          closing: hour.closing,
        })),
      }));

      const response = await http.put(`/update_hours/${restaurant._id}`, updatedData);

      setOpeningHours(editedHours);
      setIsEditing(false);
      setSuccessMessage('Vos horaires ont été modifiés avec succès');
      setErrorMessage(null);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    } catch (error: any) {
      setErrorMessage('Erreur lors de la mise à jour des horaires');
      setSuccessMessage(null);
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3500);
    }
  };

  return (
    <div className="bg-light text-black dark:text-white p-8">
      <h1 className="text-xl font-bold">Paramètres</h1>
      <h2 className="text-lg mt-1 mb-8">Gérer les paramètres principaux</h2>

      {/* Conteneur Flex pour les 3 colonnes */}
      <div className="flex justify-between gap-10">
        
        {/* Première colonne : Informations du restaurant et thème */}
        <div className="w-1/3">
          <div className='border-2 border-gray-200 p-3 m-2'>
            <div className='flex items-center pb-2'>
            <FaStore />
            <h3 className="ml-2 text-md font-semibold">Informations du restaurant</h3>
            </div>
            {restaurant ? (
              <ul>
                <li className='text-sm pb-1'><span className='font-semibold'>Nom du restaurant :</span> {restaurant.name}</li>
                <li className='text-sm pb-1'><span className='font-semibold'>Adresse :</span> {restaurant.address}</li>
                <li className='text-sm pb-1'><span className='font-semibold'>Code postal : </span>{restaurant.postal_code}</li>
                <li className='text-sm pb-1'><span className='font-semibold'>Ville : </span> {restaurant.city}</li>
                <li className='text-sm pb-1'><span className='font-semibold'>Pays : </span>{restaurant.country}</li>
              </ul>
            ) : (
              <p>Chargement des informations de la compagnie...</p>
            )}
          </div>

          <div className='border-2 border-gray-200 p-3 m-2'>
          <div className='flex items-center pb-2'>
          <FaUser />
          <h3 className="ml-2 text-sm font-semibold">Votre compte Oresto  
          </h3>
          </div>
          {user ? (
            <ul>
              <li className='text-sm pb-1'><strong>Nom : </strong>{user?.lastname}</li>
              <li className='text-sm pb-1'><strong>Prénom : </strong>{user?.firstname}</li>
              <li className='text-sm pb-1'><strong>Profil : </strong>{user?.role}</li>
              <li className='text-sm pb-1'><strong>N° de téléphone :</strong> {user?.phone_number}</li>
              <li className='text-sm pb-1'><strong>Adresse mail :</strong> {user?.email}</li>
            </ul>
          ) : (
            <p>Chargement des informations de la compagnie...</p>
          )}
          </div>
        </div>

        {/* Deuxième colonne : Horaires du restaurant */}
        <div className="w-1/3">
       {/* Vous pouvez ajouter des paramètres supplémentaires ici */}
          <div className='w-96 border-2 border-gray-200 p-3 m-2'>
          <h3 className="text-md font-semibold mb-3">
            Horaires d'ouverture
            {isEditing ? (
              <button
                onClick={handleUpdateClick}
                className="ml-4 bg-black text-white text-xs p-1 rounded"
              >
                Mettre à jour
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="ml-4 bg-black text-white text-xs p-1 rounded"
              >
                Modifier
              </button>
            )}
          </h3>

          {successMessage && (
            <div className={`success-message ${showSuccessMessage ? 'show' : ''}`}>
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className={`error-message ${showErrorMessage ? 'show' : ''}`}>
              {errorMessage}
            </div>
          )}

          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left">Jour</th>
                <th className="text-center">Midi</th>
                <th className="text-center">Soir</th>
              </tr>
            </thead>
            <tbody>
              {editedHours.map((day) => (
                <tr key={day.day} className="py-10">
                  <td className="font-semibold text-sm m-4 pr-12">
                    {daysOfWeek[day.day]}
                  </td>
                  <td className="text-center">
                    {isEditing ? (
                      <div className="flex space-x-2 justify-center">
                        <input
                          type="time"
                          value={day.hours[0]?.opening || '00:00'}
                          onChange={(e) =>
                            handleInputChange(
                              day.day,
                              day.hours[0]._id,
                              'opening',
                              e.target.value
                            )
                          }
                          className="border pl-2 rounded dark:bg-dark-900 dark:text-white border-dark-900 text-center"
                        />
                        <input
                          type="time"
                          value={day.hours[0]?.closing || '00:00'}
                          onChange={(e) =>
                            handleInputChange(
                              day.day,
                              day.hours[0]._id,
                              'closing',
                              e.target.value
                            )
                          }
                          className="border pl-2 rounded dark:bg-dark-900 dark:text-white border-dark-900"
                        />
                      </div>
                    ) : (
                      `${day.hours[0]?.opening} - ${day.hours[0]?.closing}`
                    )}
                  </td>
                  <td className="text-center">
                    {isEditing ? (
                      <div className="flex space-x-2 justify-center">
                        <input
                          type="time"
                          value={day.hours[1]?.opening || '00:00'}
                          onChange={(e) =>
                            handleInputChange(
                              day.day,
                              day.hours[1]._id,
                              'opening',
                              e.target.value
                            )
                          }
                          className="border ml-4 pl-2 rounded dark:bg-dark-900 dark:text-white border-dark-900"
                        />
                        <input
                          type="time"
                          value={day.hours[1]?.closing || '00:00'}
                          onChange={(e) =>
                            handleInputChange(
                              day.day,
                              day.hours[1]._id,
                              'closing',
                              e.target.value
                            )
                          }
                          className="border pl-2 rounded dark:bg-dark-900 dark:text-white border-dark-900"
                        />
                      </div>
                    ) : (
                      `${day.hours[1]?.opening} - ${day.hours[1]?.closing}`
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>  

          <div className='w-60 border-2 border-gray-200 p-3 m-2'>

                     {/* Section pour le thème */}
            <h3 className="font-semibold pb-3">Accessibilité / Affichage</h3>
            <button
              onClick={toggleDarkMode}
              className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white text-sm p-2 rounded"
            >
              Activer le mode {darkMode ? 'clair' : 'sombre'}
            </button>
</div>

        </div>

        {/* Troisième colonne : à personnaliser (exemple laissé vide pour l'instant) */}
        <div className="w-1/3">
        
        </div>
      </div>
    </div>
  );
};
