import { FaSort } from "react-icons/fa";
import { useState } from 'react';
import { User } from '../../../Module/Auth/user.type';
import { formatDateToFrench } from '../../../Module/Utils/dateFormatter';

interface ClientListProps {
  users: User[];
}

export const ClientList = ({ users }: ClientListProps) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSortToggle = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
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
        <div className="ml-12 mt-8 text-lg">Aucun client trouvé</div>
      ) : (
        <table className="ml-12 table-auto w-full">
          <thead>
            <tr>
              <th className="text-left flex items-center gap-1 w-1/12">
                <span>Nom</span>
                <span><FaSort onClick={handleSortToggle} className="cursor-pointer" /></span>
              </th>
              <th className="text-left w-2/12">Prénom</th>
              <th className="text-left w-2/12">N° de téléphone</th>
              <th className="text-left w-3/12">Date / heure de réservation</th>
              <th className="text-left w-1/12">Status</th>
              <th className="text-left">Nbr rés</th>
            </tr>
          </thead>
          <tbody className="clientlist">
            {sortedUsers.map((user: User) => (
              <tr
                key={user.user_id
                }
                className="hover:bg-gray-200 hover:cursor-pointer dark:hover:bg-dark-900 dark:hover:text-white"
              >
                <td className="">{user.lastname}</td>
                <td className="">{user.firstname}</td>
                <td className="py-2">{user.phone_number}</td>
                <td className="">{formatDateToFrench(user.created_at)}</td>
                <td className="">Validée</td>
                <td className="py-2">1</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
