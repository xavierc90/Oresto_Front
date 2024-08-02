import TableData, { TableForm } from '../Components/Dashboard/TableLayout/TableForm'; // Assurez-vous que les chemins d'importation sont corrects

export const TableLayoutPage = () => {
  const handleAddTable = (table: TableData) => {
    console.log("Table ajoutée:", table);
  };

  return (
    <div className="bg-light w-full">
      <h1 className="text-xl font-bold pt-2 pl-12">Plan de table</h1>
      <h2 className="text-lg pl-12 mt-1">
        <span className="font-bold text-red-500">0</span> table enregistrée
        | <span className="font-bold text-red-500">0</span> couvert
      </h2>
      <TableForm onSubmit={handleAddTable} />
    </div>
  );
};
