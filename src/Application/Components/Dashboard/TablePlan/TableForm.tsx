import React, { useState } from 'react';
import squareSvg from '../../../../../public/svg/square.svg';
import square4Svg from '../../../../../public/svg/square4.svg';
import circleSvg from '../../../../../public/svg/rounded.svg';
import circle4Svg from '../../../../../public/svg/rounded4.svg';
import rectangleSvg from '../../../../../public/svg/rectangle.svg';
import rectangle6Svg from '../../../../../public/svg/rectangle6.svg';
import rectangle8Svg from '../../../../../public/svg/rectangle8.svg';
import { http } from '../../../../Infrastructure/Http/axios.instance';
import { useAuth } from '../../../../Module/Auth/useAuth';

interface TableData {
  number: string;
  capacity: number;
  shape: string;
}

// Ajout de l'interface pour les props du composant
interface TableFormProps {
  onTableCreated?: () => void; // Fonction de rappel optionnelle
}

const tableShapes = [
  {
    shape: "square",
    capacity: 2,
    svg: squareSvg,
  },
  {
    shape: "round",
    capacity: 2,
    svg: circleSvg,
  },
  {
    shape: "square",
    capacity: 4,
    svg: square4Svg,
  },
  {
    shape: "round",
    capacity: 4,
    svg: circle4Svg,
  },
  {
    shape: "rectangle",
    capacity: 4,
    svg: rectangleSvg,
  },
  {
    shape: "rectangle",
    capacity: 6,
    svg: rectangle6Svg,
  },
  {
    shape: "rectangle",
    capacity: 8,
    svg: rectangle8Svg,
  }
];

export const TableForm: React.FC<TableFormProps> = ({ onTableCreated }) => {
  const { token, restaurant } = useAuth();
  const [tableData, setTableData] = useState<TableData>({ number: '', capacity: 0, shape: '' });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTableData(prev => ({ ...prev, [name]: value }));
  };

  const handleShapeChange = (shape: string, capacity: number) => {
    setTableData(prev => ({ ...prev, shape, capacity }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!tableData.number || !tableData.shape || !tableData.capacity) {
      setErrorMessage('Veuillez sélectionner un modèle de table');
      setSuccessMessage(null);
      setShowErrorMessage(false);
      setShowSuccessMessage(false);
      setTimeout(() => setShowErrorMessage(true), 100);
      setTimeout(() => setShowErrorMessage(false), 3500); 
      return;
    }

    if (!token || !restaurant) {
      setErrorMessage('Token ou Restaurant ID manquant');
      return;
    }

    try {
      const response = await http.post('/add_table', {
        ...tableData,
        restaurant_id: restaurant._id,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccessMessage(`Table n°${tableData.number} pour ${tableData.capacity} personnes créée avec succès`);
      setErrorMessage(null);
      setShowSuccessMessage(false);
      setShowErrorMessage(false);
      setTimeout(() => setShowSuccessMessage(true), 100);
      setTimeout(() => setShowSuccessMessage(false), 5000);
      setTableData({ number: '', capacity: 0, shape: '' });

      // Appeler la fonction de rappel si elle est fournie
      if (onTableCreated) {
        onTableCreated();
      }
    } catch (error: any) {
      setErrorMessage('Erreur lors de l’ajout de la table');
      console.error('Erreur lors de l’ajout de la table:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
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
      <form onSubmit={handleSubmit} className='flex flex-col mt-7 mb-12 pl-10'>
       <div className='flex gap-5'>
        <label className='flex items-center'>
          N° de la table :
          <input type="text" name="number" className='border-2 border-gray-300 ml-5 w-14 text-center dark:text-white dark:bg-dark-900 dark:border-2 dark:border-dark-900' value={tableData.number} onChange={handleChange} required />
        </label>
        <button type="submit" className="mt-4 mb-4 mb-2 p-2 bg-black text-white text-xs w-[130px] font-bold "> Ajouter la table</button>
        </div>
        <div className="mt-4">
          Modèle de table :
          <div className="flex gap-4 ml-4">
            {tableShapes.map(({ shape, capacity, svg }) => {
              const isSelected = tableData.shape === shape && tableData.capacity === capacity;
              return (
                <label key={`${shape}-${capacity}`} className="flex items-center space-x-2 my-4">
                  <input type="radio" name="shape" value={`${shape}-${capacity}`} checked={isSelected} 
                  onChange={() => handleShapeChange(shape, capacity)}
                  className='invisible-radio' />
                  <img src={svg} alt={shape} className={isSelected ? "filter-green" : ""} style={{ height: 60 }} />
                </label>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};
