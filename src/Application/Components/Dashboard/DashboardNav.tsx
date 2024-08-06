import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsListCheck } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { IoMdStats } from "react-icons/io";
import { FaGear } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { CalendarShadcn } from "./CalendarShadcn";
import { User } from "../../../Module/Types/user.type";
import { Company } from "../../../Module/Types/company.type";
import { http } from "../../../Infrastructure/Http/axios.instance";

export const DashboardNav = () => {
  const [dateSelected, setDateSelected] = useState<Date>(new Date());
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const companyId = localStorage.getItem('companyId');
        if (!userId || !token) {
          throw new Error('User ID or token is not available in localStorage');
        }
        // Récupérer les données utilisateur
        const userResponse = await http.get(`find_user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (userResponse.data) {
          setUser(userResponse.data);

          // Récupérer les données de la société
          if (companyId) {
            const companyResponse = await http.get(`find_company/${companyId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            setCompany(companyResponse.data);
          }
        } else {
          console.error('Données utilisateur manquantes:', userResponse.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    };

    fetchData();
  }, []); // Ajoutez un tableau de dépendances vide pour s'assurer que l'effet ne se déclenche qu'une fois

  useEffect(() => {
    const formattedDate = dateSelected.toLocaleDateString('fr-FR').replace(/\//g, '');
    console.log(dateSelected.toLocaleDateString());
    navigate(`/dashboard/bookings?dayselected=${formattedDate}`, { replace: true }); // Ajout de replace: true pour éviter l'historique inutile
  }, [dateSelected]); // Retirer navigate du tableau de dépendances

  const getLinkClass = (path: string) => {
    return location.pathname.startsWith(path)
      ? 'flex flex-col items-center text-red-500 transition duration-300'
      : 'flex flex-col items-center text-gray-600 hover:text-red-500 transition duration-300';
  };

  const handleLogout = async () => {
    try {
      // Appel à la route de déconnexion backend
      await http.post('/logout');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      // Effacer les informations d'authentification actuelles
      localStorage.removeItem('token');
      localStorage.removeItem('companyId'); // Effacer l'ID de la société
      // Forcer la réinitialisation de l'état local
      setUser(null);
      setCompany(null);
      // Vérification et redirection
      if (!localStorage.getItem('token') && !localStorage.getItem('userId')) {
        navigate('/login');
      }
    }
  };

  const formattedDate = dateSelected.toLocaleDateString('fr-FR').replace(/\//g, '');

  return (
    <div className='bg-light w-80 h-screen flex flex-col items-center shadow-2xl pt-2'>
      
          <div>
            <Link
              to={`/dashboard/bookings?dayselected=${formattedDate}`}
              className={getLinkClass('/dashboard/bookings')}>
              <img src="../../../public/img/logo-oresto-red.png" width="220px" alt="Logo Oresto" className='pt-4' />
            </Link>
            <h2 className='text-center my-6 text-base font-bold'>
              {user ? (company ? company.name : 'Chargement société...') : 'Chargement utilisateur...'}
            </h2>
          </div>

          {/* Recherche par date */}
          <div>
            <CalendarShadcn mode={"single"} selected={dateSelected} onSelect={setDateSelected} required />
          </div>

          {/* Recherche par nom */}
          <form action="#" className="flex flex-col mb-4 justify-center">
            <label htmlFor="search" className="text-sm font-bold mb-2 mt-4">Recherche par nom</label>
            <input type="text" name="name" id="search" placeholder="Saisir le nom du client" className="border-2 border-gray-300 p-1 mb-2 font-bold w-[220px]" />
          </form>

          <div className="grid grid-cols-2 gap-6 justify-items-center">
            {/* Premier Élément */}
            <Link
              to={`/dashboard/bookings?dayselected=${formattedDate}`}
              className={getLinkClass('/dashboard/bookings')}>
              <BsListCheck size={20} className="mb-1" />
              <h2 className="text-xs font-bold">Réservations</h2>
            </Link>

            {/* Deuxième Élément */}
            <Link
              to="/dashboard/layouts"
              className={getLinkClass('/dashboard/layouts')}>
              <LuLayoutDashboard size={20} className="mb-1" />
              <h2 className="text-xs font-bold">Plan de tables</h2>
            </Link>

            {/* Troisième Élément */}
            <Link
              to="/dashboard/clients"
              className={getLinkClass('/dashboard/clients')}>
              <FaUsers size={20} className="mb-1" />
              <h2 className="text-xs font-bold">Gestion clients</h2>
            </Link>

            {/* Quatrième Élément */}
            <Link
              to="/dashboard/analytics"
              className={getLinkClass('/dashboard/analytics')}>
              <IoMdStats size={20} className="mb-1" />
              <h2 className="text-xs font-bold">Statistiques</h2>
            </Link>

            {/* Cinquième Élément */}
            <Link
              to="/dashboard/settings"
              className={getLinkClass('/dashboard/settings')}>
              <FaGear size={20} className="mb-1" />
              <h2 className="text-xs font-bold">Paramètres</h2>
            </Link>

            {/* Sixième Élément */}
            <Link
              to="/login"
              onClick={handleLogout}
              className="flex flex-col items-center text-gray-600 hover:text-red-500 focus:text-red-500 transition duration-300">
              <MdLogout size={20} className="mb-1" />
              <h2 className="text-xs font-bold">Se déconnecter</h2>
            </Link>
          </div>
    </div>
  );
}
