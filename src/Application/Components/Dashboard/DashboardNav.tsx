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
import { http } from "../../../Infrastructure/Http/axios.instance";

export const DashboardNav = () => {
  const [dateSelected, setDateSelected] = useState<Date>(new Date());
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<any>(null); // Remplacez `any` par le type approprié si vous avez une définition
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les données utilisateur
        const userResponse = await http.get(`find_user/${localStorage.getItem('userId')}`);
        if (userResponse.data) {
          setUser(userResponse.data);

          // Récupérer les données de la société
          if (userResponse.data.company_id) {
            const companyResponse = await http.get(`find_company/${userResponse.data.company_id}`);
            setCompany(companyResponse.data);
          }
        } else {
          console.error('Données utilisateur manquantes:', userResponse.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const formattedDate = dateSelected.toLocaleDateString('fr-FR').replace(/\//g, '');
    console.log(dateSelected.toLocaleDateString());
    navigate(`/dashboard/bookings?dayselected=${formattedDate}`);
  }, [dateSelected, navigate]);

  const getLinkClass = (path: string) => {
    return location.pathname.startsWith(path)
      ? 'flex flex-col items-center text-red-500 transition duration-300'
      : 'flex flex-col items-center text-gray-600 hover:text-red-500 transition duration-300';
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
          <form action="clients" className="flex flex-col mb-4 justify-center">
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
              onClick={() => localStorage.removeItem('token')}
              className="flex flex-col items-center text-gray-600 hover:text-red-500 focus:text-red-500 transition duration-300">
              <MdLogout size={20} className="mb-1" />
              <h2 className="text-xs font-bold">Se déconnecter</h2>
            </Link>
          </div>
    </div>
  );
}
