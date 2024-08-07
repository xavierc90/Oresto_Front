import { FaSort } from "react-icons/fa";

export const BookingList = () => {
  return (
        <div className="scrollable-container">
            <table className="mt-8 ml-12 table-auto">
                <thead>
                    <tr>
                        <th className="text-center min-w-[100px] flex items-center gap-1">Heure <FaSort /></th>
                        <th className="text-center min-w-[150px]">Nom</th>
                        <th className="text-center min-w-[150px]">Couverts</th>
                        <th className="text-center min-w-[180px]">N° de table</th>
                        <th className="text-center min-w-[150px] flex items-center gap-1">Status <FaSort /></th>
                        <th className="text-center min-w-[150px]">Actions</th>
                    </tr>
                </thead>
                <tbody className="bookinglist">
                    {/* <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>12:00</td>
                        <td className="text-center">John Doe</td>
                        <td className="text-center">4 personnes</td>
                        <td className="text-center">12</td>
                        <td ><span className="bg-green-600 text-white px-7 py-1 text-sm font-semibold">Validée</span></td>
                        <td className="text-center">Modifier | Annuler</td>
                    </tr> */}
                    {/* <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>12:00</td>
                        <td className="text-center">John Doe</td>
                        <td className="text-center">4 personnes</td>
                        <td className="text-center">12</td>
                        <td><span className="bg-green-600 text-white px-7 py-1 text-sm font-semibold">Validée</span></td>
                        <td className="text-center">Modifier | Annuler</td>

                    </tr>                    
                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>12:00</td>
                        <td className="text-center">John Doe</td>
                        <td className="text-center">4 personnes</td>
                        <td className="text-center">12</td>
                        <td><span className="bg-green-600 text-white px-7 py-1 text-sm font-semibold">Validée</span></td>
                        <td className="text-center">Modifier | Annuler</td>
                    </tr>                    
                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>12:00</td>
                        <td className="text-center">John Doe</td>
                        <td className="text-center">4 personnes</td>
                        <td className="text-center">12</td>
                        <td><span className="bg-amber-500 text-white px-4 py-1 text-sm font-semibold">En attente</span></td>
                        <td className="text-center">Modifier | Annuler</td>
                    </tr>                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>12:00</td>
                        <td className="text-center">John Doe</td>
                        <td className="text-center">4 personnes</td>
                        <td className="text-center">12</td>
                        <td><span className="bg-green-600 text-white px-7 py-1 text-sm font-semibold">Validée</span></td>
                        <td className="text-center">Modifier | Annuler</td>
                    </tr>                    
                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>12:00</td>
                        <td className="text-center">John Doe</td>
                        <td className="text-center">4 personnes</td>
                        <td className="text-center">12</td>
                        <td><span className="bg-green-600 text-white px-7 py-1 text-sm font-semibold">Validée</span></td>
                        <td className="text-center">Modifier | Annuler</td>
                    </tr>
                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>12:00</td>
                        <td className="text-center">John Doe</td>
                        <td className="text-center">4 personnes</td>
                        <td className="text-center">12</td>
                        <td><span className="bg-green-600 text-white px-7 py-1 text-sm font-semibold">Validée</span></td>
                        <td className="text-center">Modifier | Annuler</td>
                    </tr>
                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>12:00</td>
                        <td className="text-center">John Doe</td>
                        <td className="text-center">4 personnes</td>
                        <td className="text-center">12</td>
                        <td><span className="bg-green-600 text-white px-7 py-1 text-sm font-semibold">Validée</span></td>
                        <td className="text-center">Modifier | Annuler</td>
                    </tr>
                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>12:00</td>
                        <td className="text-center">John Doe</td>
                        <td className="text-center">4 personnes</td>
                        <td className="text-center">12</td>
                        <td><span className="bg-green-600 text-white px-7 py-1 text-sm font-semibold">Validée</span></td>
                        <td className="text-center">Modifier | Annuler</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
  )
}