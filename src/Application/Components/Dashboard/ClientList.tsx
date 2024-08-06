import { FaSort } from "react-icons/fa";
import { useState } from 'react';
import { User } from '../../../Module/Types/user.type';

interface ClientListProps {
  users: User[];
}

export const ClientList = ({ users }: ClientListProps) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSortToggle = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.lastname.localeCompare(b.lastname);
    } else {
      return b.lastname.localeCompare(a.lastname);
    }
  });

  return (
    <div className="scrollable-container">
      {sortedUsers.length === 0 ? (
        <div className="ml-12 mt-8 text-lg">Aucun client enregistré</div>
      ) : (
        <table className="ml-12 table-auto w-full">
          <thead>
            <tr>
              <th className="text-left flex items-center gap-1">
                Nom 
                <FaSort onClick={handleSortToggle} className="cursor-pointer" />
              </th>
              <th className="text-left">Prénom</th>
              <th className="text-left">Email</th>
              <th className="text-left">N° de téléphone</th>
              <th className="text-left">Dernière réservation</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>
          <tbody className="clientlist">
            {sortedUsers.map((user: User) => (
              <tr key={user.userId} className="hover:bg-gray-200 hover:cursor-pointer">
                <td className="border py-2">{user.lastname}</td>
                <td className="border py-2">{user.firstname}</td>
                <td className="border py-2">{user.email}</td>
                <td className="border py-2">{user.phone_number}</td>
                <td className="border py-2">Aucune réservation</td>
                <td className="border py-2">Aucun</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
