import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsListCheck } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { IoMdStats } from "react-icons/io";
import { FaGear } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLogout, MdArrowLeft, MdArrowRight } from "react-icons/md";
import { CalendarShadcn } from "./CalendarShadcn";
import { Restaurant } from '../../../Module/Types/restaurant.type';
import { useAuth } from '../../../Module/Auth/useAuth';
import { dateService } from '../../../Module/Utils/dateService';
import { searchService } from '../../../Module/Utils/searchService';

interface DashboardNavProps {
  restaurant: Restaurant | null;
  setIsNavOpen: (isOpen: boolean) => void;
}

export const DashboardNav: React.FC<DashboardNavProps> = ({ restaurant, setIsNavOpen }) => {
  const [dateSelected, setDateSelected] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }

    const subscription = dateService.getDate().subscribe(date => {
      setDateSelected(date);
      const formattedDate = date.toISOString().split('T')[0];
      console.log("DashboardNav - Date selected and formatted:", formattedDate);
      navigate(`/dashboard/reservations?dayselected=${formattedDate}`);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const getLinkClass = (path: string) => {
    return location.pathname.startsWith(path)
      ? 'flex flex-col items-center text-red-500 dark:text-white transition duration-300'
      : 'flex flex-col items-center text-gray-600 hover:text-red-500 dark:hover:text-white transition duration-300';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDateSelect = (date: Date) => {
    console.log("DashboardNav - Date selected in calendar:", date);
    dateService.setDate(date);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    searchService.setSearch(value);
    if (value.length > 0) {
      navigate('/dashboard/clients');
    }
  };

  const toggleNav = () => {
    setIsOpen(!isOpen);
    setIsNavOpen(!isOpen);
  };

  const logoSrc = darkMode 
    ? "../../../../public/img/logo-oresto-white.png" 
    : "../../../../public/img/logo-oresto-red.png";

  return (
    <div className="flex">
      {/* DashboardNav */}
      <div
        className={`bg-light justify-center gap-8 dark:bg-dark-900 dark:text-white w-72 h-screen flex flex-col items-center shadow-2xl fixed top-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Contenu du DashboardNav */}
        <div className='mt-4'>
          <a href='../dashboard/reservations'>
            <img src={logoSrc} width="220px" alt="Oresto - Gestion des réservations" />
          </a>
          {restaurant && <h1 className='text-center pt-5 font-bold'>{restaurant.name}</h1>}
        </div>
        
        <div className="mt-2ss">
          <CalendarShadcn mode="single" selected={dateSelected} onSelect={handleDateSelect} interfaceType='restaurant' required />
        </div>

        <form className="flex flex-col justify-center">
          <label htmlFor="search" className="text-base font-bold mb-4">Recherche par nom</label>
          <input
            type="text"
            name="name"
            id="search"
            placeholder="Saisir le nom du client"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border-2 border-gray-300 p-1 mb-4 font-bold w-[215px] dark:text-white dark:bg-dark-800 dark:border-2 dark:border-dark-800"
          />
        </form>
        
        <div className="grid grid-cols-2 gap-6 justify-items-center">
          <Link to={`/dashboard/reservations?dayselected=${dateSelected.toISOString().split('T')[0]}`} className={getLinkClass('/dashboard/reservations')}>
            <BsListCheck size={23} className="mb-1" />
            <h2 className="text-xs font-bold">Réservations</h2>
          </Link>

          <Link to="/dashboard/table_plan" className={getLinkClass('/dashboard/table_plan')}>
            <LuLayoutDashboard size={23} className="mb-1" />
            <h2 className="text-xs font-bold dark:text-grey-700">Plan de table</h2>
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

          <Link to="/login" onClick={handleLogout} className="flex flex-col items-center text-gray-600 hover:text-red-500 focus:text-red-500 transition duration-300 dark:hover:text-white">
            <MdLogout size={23} className="mb-1" />
            <h2 className="text-xs font-bold">Se déconnecter</h2>
          </Link>
        </div>

        {/* Bouton de bascule */}
        <button
          onClick={toggleNav}
          className="absolute top-5 -right-9 transform -translate-y-1/2 bg-white dark:bg-dark-800 p-2 rounded-md shadow-lg focus:outline-none"
        >
          {isOpen ? <MdArrowLeft size={20} /> : <MdArrowRight size={20} />}
        </button>
      </div>

      {/* Le contenu principal est géré dans DashboardPage */}
    </div>
  );
};
