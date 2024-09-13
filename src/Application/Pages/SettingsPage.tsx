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

const daysOfWeek = {
  Monday: 'Lundi',
  Tuesday: 'Mardi',
  Wednesday: 'Mercredi',
  Thursday: 'Jeudi',
  Friday: 'Vendredi',
  Saturday: 'Samedi',
  Sunday: 'Dimanche',
};

const frenchDaysOrder = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

// Données par défaut pour les horaires si aucune plage horaire n'est trouvée
const defaultOpeningHours = frenchDaysOrder.map((day) => ({
  _id: day,
  day: day,
  hours: [
    { opening: '00:00', closing: '00:00', _id: '1' },
    { opening: '00:00', closing: '00:00', _id: '2' },
  ]
}));

export const SettingsPage = () => {
  const { company } = useOutletContext<ContextType>();
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>(defaultOpeningHours); // Remplir par défaut si pas d'horaires trouvés
  const [isEditing, setIsEditing] = useState(true); // Mode édition toujours activé
  const [editedHours, setEditedHours] = useState<OpeningHour[]>(defaultOpeningHours); // Initialiser les horaires modifiables

  useEffect(() => {
    const fetchOpeningHours = async () => {
      if (company?._id) {
        try {
          const response = await http.get(`/opening_hours/${company._id}`);
          if (response.data.length === 0) {
            setOpeningHours(defaultOpeningHours);
            setEditedHours(defaultOpeningHours);
          } else {
            const sortedOpeningHours = response.data
              .map((day: OpeningHour) => ({
                ...day,
                day: daysOfWeek[day.day],
              }))
              .sort((a: any, b: any) => frenchDaysOrder.indexOf(a.day) - frenchDaysOrder.indexOf(b.day));

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

  const handleUpdateClick = async () => {
    try {
      for (const day of editedHours) {
        const formattedHours = day.hours.map((hour) => ({ opening: hour.opening, closing: hour.closing }));
        await http.put(`/update_hours/${company?._id}`, { day: day.day, hours: formattedHours });
      }
      setOpeningHours(editedHours);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des horaires :', error);
    }
  };

  return (
    <div className="bg-light text-black dark:text-white p-8">
      <h1 className="text-xl font-bold">Paramètres</h1>
      <h2 className="text-lg mt-1 mb-8">Gérer les fonctionnalités de l'application</h2>

      <div className="flex justify-between">
        <div className="w-1/2 pr-4">
          <h3 className="text-lg font-semibold pb-5">Informations du restaurant</h3>
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
          <h3 className="text-lg font-semibold pb-3">
            Horaires d'ouverture
            <button 
              onClick={handleUpdateClick} 
              className="ml-4 bg-black text-white text-sm p-1 rounded"
            >
              Mettre à jour
            </button>
          </h3>
          
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="text-left">Jour</th>
                <th className="text-left">Repas du midi</th>
                <th className="text-left">Repas du soir</th>
              </tr>
            </thead>
            <tbody>
              {editedHours.map((day) => (
                <tr key={day._id} className="mb-4">
                  <td className="font-semibold">{day.day} :</td>
                  <td className="pl-4">
                    {isEditing ? (
                      <div className="flex space-x-2">
                        <input
                          type="time"
                          value={day.hours[0]?.opening || '00:00'}
                          onChange={(e) => handleInputChange(day._id, day.hours[0]._id, 'opening', e.target.value)}
                          className="border p-1 w-24"
                        />
                        <span>-</span>
                        <input
                          type="time"
                          value={day.hours[0]?.closing || '00:00'}
                          onChange={(e) => handleInputChange(day._id, day.hours[0]._id, 'closing', e.target.value)}
                          className="border p-1 w-24"
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
                          className="border p-1 w-24"
                        />
                        <span>-</span>
                        <input
                          type="time"
                          value={day.hours[1]?.closing || '00:00'}
                          onChange={(e) => handleInputChange(day._id, day.hours[1]._id, 'closing', e.target.value)}
                          className="border p-1 w-24"
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
        <h3 className="text-lg font-semibold">Thème</h3>
        <button 
          onClick={toggleDarkMode} 
          className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-2 rounded"
        >
          Activer le mode {darkMode ? 'clair' : 'sombre'}
        </button>
      </div>
    </div>
  );
};
