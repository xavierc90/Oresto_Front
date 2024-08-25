import React, { useState } from 'react';
import squareSvg from '../../../../../public/svg/square.svg';
import square4Svg from '../../../../../public/svg/square4.svg';
import circleSvg from '../../../../../public/svg/rounded.svg';
import circle4Svg from '../../../../../public/svg/rounded4.svg';
import rectangleSvg from '../../../../../public/svg/rectangle.svg';
import rectangle6Svg from '../../../../../public/svg/rectangle6.svg';
import rectangle8Svg from '../../../../../public/svg/rectangle8.svg';
import { http } from '../../../../Infrastructure/Http/axios.instance';
import { useAuth } from '../../../../Module/Auth/useAuth'

interface TableData {
  table_number: string;
  table_size: string;
  shape: string;
}

const tableShapes = [
  {
    shape: "square",
    table_size: "2",
    svg: squareSvg,
  },
  {
    shape: "round",
    table_size: "2",
    svg: circleSvg,
  },
  {
    shape: "square",
    table_size: "4",
    svg: square4Svg,
  },
  {
    shape: "round",
    table_size: "4",
    svg: circle4Svg,
  },
  {
    shape: "rectangle",
    table_size: "4",
    svg: rectangleSvg,
  },
  {
    shape: "rectangle",
    table_size: "6",
    svg: rectangle6Svg,
  },
  {
    shape: "rectangle",
    table_size: "8",
    svg: rectangle8Svg,
  }
];

export const TableForm: React.FC = () => {
  const { token, company } = useAuth();
  const [tableData, setTableData] = useState<TableData>({ table_number: '', table_size: '', shape: '' });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTableData(prev => ({ ...prev, [name]: value }));
  };

  const handleShapeChange = (shape: string, table_size: string) => {
    setTableData(prev => ({ ...prev, shape, table_size }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!tableData.table_number || !tableData.shape || !tableData.table_size) {
      setErrorMessage('Veuillez sélectionner un modèle de table');
      setSuccessMessage(null);
      setShowErrorMessage(false);
      setShowSuccessMessage(false);
      setTimeout(() => setShowErrorMessage(true), 0);
      setTimeout(() => setShowErrorMessage(false), 3500); 
      return;
    }

    if (!token || !company) {
      setErrorMessage('Token ou Company ID manquant');
      return;
    }

    try {
      const response = await http.post('/add_table', {
        ...tableData,
        company_id: company._id,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccessMessage(`Table n°${tableData.table_number} pour ${tableData.table_size} personnes créée avec succès`);
      setErrorMessage(null);
      setShowSuccessMessage(false);
      setShowErrorMessage(false);
      setTimeout(() => setShowSuccessMessage(true), 0);
      setTimeout(() => setShowSuccessMessage(false), 5000);
      setTableData({ table_number: '', table_size: '', shape: '' });
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
      <form onSubmit={handleSubmit} className='flex flex-col mt-10 ml-12'>
        <label className='flex items-center'>
          N° de la table :
          <input type="text" name="table_number" className='border-2 border-gray-300 ml-5 w-14 text-center dark:text-white dark:bg-dark-900 dark:border-2 dark:border-dark-900' value={tableData.table_number} onChange={handleChange} required />
        </label>
        <div className="mt-4">
          Modèle de table :
          <div className="flex gap-4 ml-4">
            {tableShapes.map(({ shape, table_size, svg }) => {
              const isSelected = tableData.shape === shape && tableData.table_size === table_size;
              return (
                <label key={`${shape}-${table_size}`} className="flex items-center space-x-2 my-4">
                  <input type="radio" name="shape" value={`${shape}-${table_size}`} checked={isSelected} 
                  onChange={() => handleShapeChange(shape, table_size)}
                  className='invisible-radio' />
                  <img src={svg} alt={shape} className={isSelected ? "filter-green" : ""} style={{ height: 60 }} />
                </label>
              );
            })}
          </div>
        </div>
        <button type="submit" className="mt-4 mb-4 mb-2 p-2 bg-black text-white text-sm w-[130px] "> Ajouter la table</button>
      </form>
    </div>
  );
};
