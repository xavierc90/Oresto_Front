import { TableArea } from '../Components/Dashboard/TablePlan/TableArea';
import TableData  from '../Components/Dashboard/TablePlan/TableForm'; // Assurez-vous que les chemins d'importation sont corrects
import { http } from '../../Infrastructure/Http/axios.instance'; // Assurez-vous que les chemins d'importation sont corrects
import { TableForm } from '../Components/Dashboard/TablePlan/TableForm';

export const TablePlanPage = () => {
  // Assumer que le token est stocké dans le stockage local ou géré par un contexte d'état
  const token = localStorage.getItem('token');  // Ou utilisez un contexte ou Redux store pour accéder au token

  // Typage explicite pour tableData
  const handleAddTable = async (tableData: TableData) => {
    try {
      const response = await http.post('/add_table', tableData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Table ajoutée:", response.data);
    } catch (error: any) {  // Typage pour error en utilisant 'any', ou utilisez 'unknown' et ajoutez des vérifications de type
      console.error('Erreur lors de l’ajout de la table:', error.response ? error.response.data : error.message);
    }
  };


  return (
    <div className="bg-light w-full">
      <h1 className="text-xl font-bold pt-8 pl-12">Plan de table</h1>
      <h2 className="text-lg pl-12 mt-1">
        <span className="font-bold text-red-500 dark:text-white">0</span> table enregistrée
        | <span className="font-bold text-red-500 dark:text-white">0</span> couvert
      </h2>
      <TableForm onSubmit={handleAddTable} />
      <TableArea />
    </div>
  );
};