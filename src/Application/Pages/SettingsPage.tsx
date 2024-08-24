import { useOutletContext } from 'react-router-dom';
import { Company } from '../../Module/Auth/company.type';
import { useDarkMode } from '../../Module/Utils/darkMode'; // Assurez-vous que le chemin est correct

interface ContextType {
  company: Company | null;
}

export const SettingsPage = () => {
  const { company } = useOutletContext<ContextType>();
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <div className="bg-light text-black dark:text-white p-8">
      <h1 className="text-xl font-bold">Paramètres</h1>
      <h2 className="text-lg mt-1 mb-8">Gérer les fonctionnalités de l'application</h2>

      <div className="mb-6">
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

      <div className="mb-6">
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
