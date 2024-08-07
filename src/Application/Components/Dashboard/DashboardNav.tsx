import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsListCheck } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { IoMdStats } from "react-icons/io";
import { FaGear } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { CalendarShadcn } from "./CalendarShadcn";
import { Company } from '../../../Module/Types/company.type'; // Assurez-vous que le chemin est correct
import { useAuth } from '../../../Module/Auth/auth.hook'; // Assurez-vous que le chemin est correct

// Définir les props attendues avec leur type
interface DashboardNavProps {
  company: Company | null;
}

export const DashboardNav: React.FC<DashboardNavProps> = ({ company }) => {
  const [dateSelected, setDateSelected] = useState<Date>(new Date());
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  useEffect(() => {
    const formattedDate = dateSelected.toLocaleDateString('fr-FR').replace(/\//g, '');
    console.log(dateSelected.toLocaleDateString())
    navigate(`/dashboard/bookings?dayselected=${formattedDate}`);
  }, [dateSelected, navigate]);

  // Fonction pour déterminer la classe CSS en fonction du chemin actuel
  const getLinkClass = (path: string) => {
    return location.pathname.startsWith(path)
      ? 'flex flex-col items-center text-red-500 transition duration-300'
      : 'flex flex-col items-center text-gray-600 hover:text-red-500 transition duration-300';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='bg-light w-80 h-screen flex flex-col items-center shadow-2xl mt-2'>
      <div>
        <img src="../../../public/img/logo-oresto-red.png" width="240px" alt="Logo Oresto" />
        {company && <h1 className='text-center pt-5 font-bold'>{company.name}</h1>}
      </div>
      
      {/* Sélecteur de date */}
      <div className="mt-5">
        <CalendarShadcn mode="single" selected={dateSelected} onSelect={setDateSelected} required />
      </div>


      {/* Formulaire de recherche par nom */}
      <form className="flex flex-col mb-2 justify-center">
        <label htmlFor="search" className="text-base font-bold mb-4 pt-4
        ">Recherche par nom</label>
        <input type="text" name="name" id="search" placeholder="Saisir le nom du client" className="border-2 border-gray-300 p-1 mb-4 font-bold w-[215px]" />
      </form>
      
      {/* Liens de navigation */}
      <div className="grid grid-cols-2 gap-6 justify-items-center">
        <Link to={`/dashboard/bookings?dayselected=${dateSelected.toLocaleDateString('fr-FR').replace(/\//g, '')}`} className={getLinkClass('/dashboard/bookings')}>
          <BsListCheck size={23} className="mb-1" />
          <h2 className="text-xs font-bold">Réservations</h2>
        </Link>

        <Link to="/dashboard/layouts" className={getLinkClass('/dashboard/layouts')}>
          <LuLayoutDashboard size={23} className="mb-1" />
          <h2 className="text-xs font-bold">Plan de tables</h2>
        </Link>

        <Link to="/dashboard/clients" className={getLinkClass('/dashboard/clients')}>
          <FaUsers size={23} className="mb-1" />
          <h2 className="text-xs font-bold">Gestion clients</h2>
        </Link>

        <Link to="/dashboard/analytics" className={getLinkClass('/dashboard/analytics')}>
          <IoMdStats size={23} className="mb-1" />
          <h2 className="text-xs font-bold">Statistiques</h2>
        </Link>

        <Link to="/dashboard/settings" className={getLinkClass('/dashboard/settings')}>
          <FaGear size={23} className="mb-1" />
          <h2 className="text-xs font-bold">Paramètres</h2>
        </Link>

        <Link to="/login"  onClick={handleLogout} className="flex flex-col items-center text-gray-600 hover:text-red-500 focus:text-red-500 transition duration-300">
          <MdLogout size={23} className="mb-1" />
          <h2 className="text-xs font-bold">Se déconnecter</h2>
        </Link>
      </div>
    </div>
  );
};
