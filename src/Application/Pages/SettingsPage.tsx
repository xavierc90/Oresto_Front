import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Company } from '../../Module/Types/company.type';
import { useDarkMode } from '../../Module/Utils/darkMode';
import { http } from '../../Infrastructure/Http/axios.instance';

interface ContextType {
  company: Company | null;
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

const daysOfWeek: { [key: string]: OpeningHour['day'] } = {
  Lundi: 'Monday',
  Mardi: 'Tuesday',
  Mercredi: 'Wednesday',
  Jeudi: 'Thursday',
  Vendredi: 'Friday',
  Samedi: 'Saturday',
  Dimanche: 'Sunday',
};

const frenchDaysOrder = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

// Données par défaut pour les horaires si aucune plage horaire n'est trouvée
const defaultOpeningHours: OpeningHour[] = frenchDaysOrder.map((day) => ({
  _id: day,
  day: daysOfWeek[day] || 'Monday', // Assurez-vous que le jour est bien formaté
  hours: [
    { opening: '00:00', closing: '00:00', _id: '1' },
    { opening: '00:00', closing: '00:00', _id: '2' },
  ]
}));

export const SettingsPage = () => {
  const { company } = useOutletContext<ContextType>();
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>(defaultOpeningHours);
  const [isEditing, setIsEditing] = useState(false); // Changer la valeur initiale à false
  const [editedHours, setEditedHours] = useState<OpeningHour[]>(defaultOpeningHours);
  const [updateMessage, setUpdateMessage] = useState(''); // Pour le message de confirmation

  useEffect(() => {
    const fetchOpeningHours = async () => {
      if (company?._id) {
        try {
          const response = await http.get(`/opening_hours/${company._id}`);
          const fetchedHours: OpeningHour[] = response.data;

          if (fetchedHours.length === 0) {
            setOpeningHours(defaultOpeningHours);
            setEditedHours(defaultOpeningHours);
          } else {
            const sortedOpeningHours = fetchedHours
              .map((day) => ({
                ...day,
                day: Object.keys(daysOfWeek).find(key => daysOfWeek[key] === day.day) || day.day,
              }))
              .sort((a, b) => frenchDaysOrder.indexOf(a._id) - frenchDaysOrder.indexOf(b._id));

            setOpeningHours(sortedOpeningHours);
            setEditedHours(sortedOpeningHours);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des horaires :', error);
        }
      }
    };

    if (company?._id) {
      fetchOpeningHours();
    }
  }, [company?._id]);

  const handleInputChange = (dayId: string, hourId: string, field: string, value: string) => {
    const updatedHours = editedHours.map((day) => {
      if (day._id === dayId) {
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
    setUpdateMessage(''); // Réinitialiser le message lors du début de l'édition
  };

  const handleUpdateClick = async () => {
    try {
      const updatedData = editedHours.map(day => ({
        day: day.day,
        hours: day.hours.map(hour => ({
          opening: hour.opening,
          closing: hour.closing
        }))
      }));
  
      console.log('Données envoyées au serveur :', updatedData);
  
      const response = await http.put(`/update_hours/${company.id}`, updatedData);
      console.log('Réponse du serveur :', response.status, response.data);
  
      // Mettez à jour les heures affichées avec les heures éditées
      setOpeningHours(editedHours);
      // Réinitialisez les heures éditées avec les heures mises à jour
      setEditedHours(editedHours);
      setIsEditing(false); // Quittez le mode édition
      setUpdateMessage('Vos horaires ont été modifiées'); // Afficher le message de confirmation
    } catch (error) {
      console.error('Erreur lors de la mise à jour des horaires :', error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-light text-black dark:text-white p-8">
      <h1 className="text-xl font-bold">Paramètres</h1>
      <h2 className="text-lg mt-1 mb-8">Gérer les paramètres de l'application</h2>

      <div className="flex justify-between">
        <div className="w-1/2 pr-4">
          <h3 className="text-md font-semibold pb-5">Informations du restaurant</h3>
          {company ? (
            <>
              <p><strong>Nom:</strong> {company.name}</p>
              <p><strong>Adresse:</strong> {company.address}</p>
              <p><strong>Ville :</strong> {company.city}</p>
              <p><strong>Code postal :</strong> {company.postal_code}</p>
              <p><strong>Pays :</strong> {company.country}</p>
            </>
          ) : (
            <p>Chargement des informations de la compagnie...</p>
          )}
        </div>

        <div className="w-2/3 pl-4">
          <h3 className="text-md font-semibold pb-5">
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

          {updateMessage && <p className="text-green-600">{updateMessage}</p>} {/* Afficher le message de confirmation */}

          <table className="w-100 table-auto text-sm">
            <thead>
              <tr>
                <th className="text-left">Jour</th>
                <th className="text-center">Midi</th>
                <th className="text-center">Soir</th>
              </tr>
            </thead>
            <tbody>
              {editedHours.map((day) => (
                <tr key={day._id} className="mb-4">
                  <td className="font-semibold text-sm m-4 pr-7">{day.day} :</td>
                  <td className="text-center">
                    {isEditing ? (
                      <div className="flex space-x-2 text-center">
                        <input
                          type="time"
                          value={day.hours[0]?.opening || '00:00'}
                          onChange={(e) => handleInputChange(day._id, day.hours[0]._id, 'opening', e.target.value)}
                          className="border p-1 w-24 dark:bg-dark-900 dark:text-white border-dark-900 text-center"
                        />
                        <input
                          type="time"
                          value={day.hours[0]?.closing || '00:00'}
                          onChange={(e) => handleInputChange(day._id, day.hours[0]._id, 'closing', e.target.value)}
                          className="border p-1 w-24 dark:bg-dark-900 dark:text-white border-dark-900"
                        />
                      </div>
                    ) : (
                      `${day.hours[0]?.opening} - ${day.hours[0]?.closing}`
                    )}
                  </td>
                  <td className="pl-4">
                    {isEditing ? (
                      <div className="flex space-x-2">
                        <input
                          type="time"
                          value={day.hours[1]?.opening || '00:00'}
                          onChange={(e) => handleInputChange(day._id, day.hours[1]._id, 'opening', e.target.value)}
                          className="border p-1 w-24 dark:bg-dark-900 dark:text-white border-dark-900"
                        />
                        <input
                          type="time"
                          value={day.hours[1]?.closing || '00:00'}
                          onChange={(e) => handleInputChange(day._id, day.hours[1]._id, 'closing', e.target.value)}
                          className="border p-1 w-24 dark:bg-dark-900 dark:text-white border-dark-900"
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
      </div>

      <div className="mt-6">
        <h3 className="font-semibold pb-3">Thème</h3>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white text-sm p-2 rounded"
        >
          Activer le mode {darkMode ? 'clair' : 'sombre'}
        </button>
      </div>
    </div>
  );
};
