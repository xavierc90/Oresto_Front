import { FaSort } from "react-icons/fa";
import { User } from '../../../Module/Types/user.type';

interface ClientListProps {
  users: User[];
}

export const ClientList = ({ users }: ClientListProps) => {
  return (
    <div className="scrollable-container">
      <table className="ml-12 table-auto">
        <thead>
          <tr>
            <th className="text-left min-w-[130px] flex items-center gap-1">Nom <FaSort /></th>
            <th className="text-left min-w-[120px]">Prénom</th>
            <th className="text-left min-w-[280px]">Email</th>
            <th className="text-left min-w-[280px]">N° de téléphone</th>
          </tr>
        </thead>
        <tbody className="clientlist">
          {users.map((user: User) => (
            <tr key={user.userId} className="hover:bg-gray-200 hover:cursor-pointer">
              <td className="border px-4 py-2">{user.lastname}</td>
              <td className="border px-4 py-2">{user.firstname}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
