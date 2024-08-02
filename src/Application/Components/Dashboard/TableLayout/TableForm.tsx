import React, { useState } from 'react';
import squareSvg from '../../../../../public/svg/square.svg';
import square4Svg from '../../../../../public/svg/square4.svg';
import rectangleSvg from '../../../../../public/svg/rectangle.svg';
import rectangle6Svg from '../../../../../public/svg/rectangle6.svg';
import rectangle8Svg from '../../../../../public/svg/rectangle8.svg';
import circleSvg from '../../../../../public/svg/rounded.svg';
import circle4Svg from '../../../../../public/svg/rounded4.svg';

// Définition des types pour la clarté
interface TableData {
  number: string;
  capacity: string;
  shape: string;
}

interface TableFormProps {
  onSubmit: (table: TableData) => void;
}

// Options de forme de la table avec capacité et fichiers SVG
const tableShapes = [
    {
      shape: "squaretwo",
      capacity: "2",
      svg: squareSvg,
    },
    {
      shape: "circletwo",
      capacity: "2",
      svg: circleSvg,
    },
    {
      shape: "squarefour",
      capacity: "4",
      svg: square4Svg,
    },
    {
      shape: "circlefour",
      capacity: "4",
      svg: circle4Svg,
    },
    {
      shape: "rectanglefour",
      capacity: "4",
      svg: rectangleSvg,
    },
    {
      shape: "rectanglesix",
      capacity: "6",
      svg: rectangle6Svg,
    },
    {
      shape: "rectangleeight",
      capacity: "8",
      svg: rectangle8Svg,
    }
  ];

export const TableForm: React.FC<TableFormProps> = ({ onSubmit }) => {
  const [tableData, setTableData] = useState<TableData>({ number: '', capacity: '', shape: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTableData(prev => ({ ...prev, [name]: value }));
  };

  const handleShapeChange = (shape: string, capacity: string) => {
    setTableData(prev => ({ ...prev, shape, capacity }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(tableData);
    setTableData({ number: '', capacity: '', shape: '' });
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col mt-10 ml-12'>
      <label>
        N° de la table :
        <input type="text" name="number" className='border-2 border-gray-300 ml-5 w-14' value={tableData.number} onChange={handleChange} required />
      </label>
      <div className="mt-4">
        Taille et forme de la table (max 8 personnes) :
        <div className="flex gap-4 ml-4">
          {tableShapes.map(({ shape, capacity, svg }) => (
            <label key={shape} className="flex items-center space-x-2 my-4">
              <input type="radio" name="shape" value={shape} checked={tableData.shape === shape} 
              onChange={() => handleShapeChange(shape, capacity)}
              className='invisible-radio' />
              <img src={svg} alt={shape} className={tableData.shape === shape ? "filter-green" : ""} style={{ height: 70 }} />
            </label>
          ))}
        </div>
      </div>
      <button type="submit" className="mt-4 p-2 bg-black text-white w-[150px]"> Ajouter la table</button>
    </form>
  );
};
