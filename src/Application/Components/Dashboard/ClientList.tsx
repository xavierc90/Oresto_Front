import { FaSort } from "react-icons/fa";

export const ClientList = () => {
  return (
    <div className="scrollable-container">
            <table className="ml-12">
                <thead>
                    <tr>
                        <th className="text-left min-w-[140px] flex items-center gap-1">Nom <FaSort /></th>
                        <th className="text-left min-w-[130px]">Prénom</th>
                        <th className="text-left min-w-[280px]">Email</th>
                        <th className="text-left min-w-[150px]">N° téléphone</th>
                        <th className="text-left min-w-[330px]">Date / Heure de réservation</th>
                        <th className="text-left min-w-[150px]">Status</th>
                        <th className="text-left min-w-[100px] flex items-center gap-1">Nbr rés<FaSort /></th>
                    </tr>
                </thead>
                <tbody className="clientlist">
                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>Angelo</td>
                        <td>Ricardo</td>
                        <td>angelo.ricardo@gmail.com</td>
                        <td>06 59 51 33 32</td>
                        <td>Samedi 22 septembre 2024 à 13h30</td>
                        <td>Archivée</td>
                        <td className="text-center">3</td>
                    </tr>
                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>Blanc</td>
                        <td>Alexis</td>
                        <td>blanc.alexis39@hotmail.fr</td>
                        <td>01 50 38 47 25</td>
                        <td>Vendredi 12 juillet 2024 à 12h15</td>
                        <td>Archivée</td>
                        <td className="text-center">1</td>
                    </tr>                    
                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>Bertin</td>
                        <td>Denis</td>
                        <td>denisbertin@outlook.com</td>
                        <td>07 03 84 93 34</td>
                        <td>Lundi 17 juin 2024 à 12h00</td>
                        <td>Archivée</td>
                        <td className="text-center">2</td>
                    </tr>                    
                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>Brocard</td>
                        <td>Aurélie</td>
                        <td>aurelie.brocard@gmail.com</td>
                        <td>06 59 51 33 32</td>
                        <td>Mercredi 4 août 2024 à 12h00</td>
                        <td>Validée</td>
                        <td className="text-center">1</td>
                    </tr>                    
                    <tr className="hover:bg-gray-200 font-bold hover:cursor-pointer">
                        <td>Chardi</td>
                        <td>Leila</td>
                        <td>l.chardi@gmail.com</td>
                        <td>06 59 51 33 32</td>
                        <td>Jeudi 22 août 2024</td>
                        <td>En attente</td>
                        <td className="text-center">1</td>
                    </tr>                    
                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>Chaves</td>
                        <td>Emilio</td>
                        <td>chavesdacruze@gmail.com</td>
                        <td>06 59 51 33 32</td>
                        <td>Mercredi 2 février 2024</td>
                        <td>Archivée</td>
                        <td className="text-center">5</td>
                    </tr>
                    <tr className="hover:bg-gray-200 font-bold hover:cursor-pointer">
                        <td>Colombel</td>
                        <td>Rolande</td>
                        <td>rolande.colombel@hotmail.fr</td>
                        <td>06 21 93 74 63</td>
                        <td>Samedi 23 septembre 2024</td>
                        <td>En attente</td>
                        <td className="text-center">1</td>
                    </tr>                    
                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>Denisot</td>
                        <td>Julien</td>
                        <td>jdenisot@gmail.com</td>
                        <td>06 59 51 33 32</td>
                        <td>Samedi 2 juillet 2024</td>
                        <td>Archivée</td>
                        <td className="text-center">1</td>
                    </tr>
                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>Estinanget</td>
                        <td>Manuel</td>
                        <td>manu.estinanget@gmail.com</td>
                        <td>06 59 51 33 32</td>
                        <td>Samedi 23 septembre 2024</td>
                        <td>En attente</td>
                        <td className="text-center">1</td>
                    </tr>
                    <tr className="hover:bg-gray-200 hover:cursor-pointer">
                        <td>Fuarez</td>
                        <td>Patrice</td>
                        <td>pfuarez@gmail.com</td>
                        <td>06 59 51 33 32</td>
                        <td>Samedi 23 septembre 2024</td>
                        <td>Annulée</td>
                        <td className="text-center">1</td>
                    </tr>
                    <tr className="hover:bg-gray-200 font-bold hover:cursor-pointer">
                        <td>Fizenaz</td>
                        <td>Emilie</td>
                        <td>efizenaz@gmail.com</td>
                        <td>06 59 51 33 32</td>
                        <td>Samedi 1 septembre 2024</td>
                        <td>En attente</td>
                        <td className="text-center">1</td>
                    </tr>
                </tbody>
            </table>
        </div>
  )
}
