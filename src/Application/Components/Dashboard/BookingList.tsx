import { FaSort } from "react-icons/fa";

export const BookingList = () => {
  return (
        <div>
            <table className="mt-8 ml-12 table-auto">
                <thead>
                    <tr>
                        <th className="text-left min-w-[100px] flex items-center gap-1">Heure <FaSort /></th>
                        <th className="text-left min-w-[150px]">Nom</th>
                        <th className="text-left min-w-[150px]">Couverts</th>
                        <th className="text-left min-w-[150px]">N° de table</th>
                        <th className="text-left min-w-[150px] flex items-center gap-1">Status <FaSort /></th>
                        <th className="text-left min-w-[150px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>12:00</td>
                        <td>John Doe</td>
                        <td>4 personnes</td>
                        <td>12</td>
                        <td>En attente</td>
                        <td>Modifier | Annuler</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                        <td>John Doe</td>
                        <td>4 personnes</td>
                        <td>12</td>
                        <td>En attente</td>
                        <td>Modifier | Annuler</td>

                    </tr>                    <tr>
                        <td>12:00</td>
                        <td>John Doe</td>
                        <td>4 personnes</td>
                        <td>12</td>
                        <td>En attente</td>
                        <td>Modifier | Annuler</td>
                    </tr>                    <tr>
                        <td>12:00</td>
                        <td>John Doe</td>
                        <td>4 personnes</td>
                        <td>12</td>
                        <td>En attente</td>
                        <td>Modifier | Annuler</td>
                    </tr>                    <tr>
                        <td>12:00</td>
                        <td>John Doe</td>
                        <td>4 personnes</td>
                        <td>12</td>
                        <td>En attente</td>
                        <td>Modifier | Annuler</td>
                    </tr>                    <tr>
                        <td>12:00</td>
                        <td>John Doe</td>
                        <td>4 personnes</td>
                        <td>12</td>
                        <td>En attente</td>
                        <td>Modifier | Annuler</td>
                    </tr>
                </tbody>
            </table>
        </div>
   )
}