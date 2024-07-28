import { FaSort } from "react-icons/fa";

export const ClientList = () => {
  return (
    <div>
            <table className="mt-8 ml-12 table-auto">
                <thead>
                    <tr>
                        <th className="text-left min-w-[140px] flex items-center gap-1">Nom <FaSort /></th>
                        <th className="text-left min-w-[150px]">Prénom</th>
                        <th className="text-left min-w-[350px]">Date / Heure de réservation</th>
                        <th className="text-left min-w-[150px]">Status</th>
                        <th className="text-left min-w-[10px] flex items-center gap-1">Nbr rés<FaSort /></th>
                    </tr>
                </thead>
                <tbody className="clientlist">
                    <tr className="hover:bg-gray-200 hover:cursor-pointer h-2">
                        <td>Angelo</td>
                        <td>Ricardo</td>
                        <td>Samedi 22 septembre 2024 à 13h30</td>
                        <td>Archivée</td>
                        <td className="text-center">3</td>
                    </tr>
                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>Blanc</td>
                        <td>Alexis</td>
                        <td>Vendredi 12 juillet 2024 à 12h15</td>
                        <td>Archivée</td>
                        <td className="text-center">1</td>
                    </tr>                    
                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>Bertin</td>
                        <td>Denis</td>
                        <td>Lundi 17 juin 2024 à 12h00</td>
                        <td>Archivée</td>
                        <td className="text-center">2</td>
                    </tr>                    
                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>Brocard</td>
                        <td>Aurélie</td>
                        <td>Mercredi 4 août 2024 à 12h00</td>
                        <td>Validée</td>
                        <td className="text-center">1</td>
                    </tr>                    
                    <tr className="hover:bg-gray-200 font-bold hover:cursor-pointer">
                        <td>Chardi</td>
                        <td>Leila</td>
                        <td>Jeudi 22 août 2024</td>
                        <td>En attente</td>
                        <td className="text-center">1</td>
                    </tr>                    
                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>Chaves</td>
                        <td>Emilio</td>
                        <td>Mercredi 2 février 2024</td>
                        <td>Archivée</td>
                        <td className="text-center">5</td>
                    </tr>
                    <tr className="hover:bg-gray-200 font-bold hover:cursor-pointer">
                        <td>Colombel</td>
                        <td>Rolande</td>
                        <td>Samedi 23 septembre 2024</td>
                        <td>En attente</td>
                        <td className="text-center">1</td>
                    </tr>
                </tbody>
            </table>
        </div>
  )
}
