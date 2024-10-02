// DashboardNav.tsx

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
import clsx from 'clsx'; // Utilisé pour gérer les classes conditionnelles
import Tippy from '@tippyjs/react'; // Import de Tippy
import 'tippy.js/dist/tippy.css'; // Import des styles de Tippy

interface DashboardNavProps {
  restaurant: Restaurant | null;
  setIsNavOpen: (isOpen: boolean) => void;
}

export const DashboardNav: React.FC<DashboardNavProps> = ({ restaurant, setIsNavOpen }) => {
  const [dateSelected, setDateSelected] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true); // État local pour gérer la visibilité
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
    setIsNavOpen(!isOpen); // Met à jour l'état dans DashboardPage
  };

  const logoSrc = darkMode 
    ? "/img/logo-oresto-white.png" 
    : "/img/logo-oresto-red.png"; // Assurez-vous que le chemin est correct

  return (
    <div>
      {/* Conteneur principal du DashboardNav */}
      <div
        className={`bg-light dark:bg-dark-900 dark:text-white h-screen flex flex-col items-center shadow-2xl fixed top-0 left-0 transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'w-72' : 'w-16'
        }`}
      >
        {/* Logo et nom du restaurant */}
        {isOpen && (
          <div className='mt-16 flex flex-col items-center'>
            <Link to="/dashboard/reservations">
              <img src={logoSrc} width="220px" alt="Oresto - Gestion des réservations" />
            </Link>
            {restaurant && <h1 className='text-center pt-5 font-bold'>{restaurant.name}</h1>}
          </div>
        )}

        {/* Calendrier */}
        {isOpen && (
          <div className="mt-4 px-4">
            <CalendarShadcn mode="single" selected={dateSelected} onSelect={handleDateSelect} interfaceType='restaurant' required />
          </div>
        )}

        {/* Formulaire de recherche */}
        {isOpen && (
          <form className="flex flex-col justify-center mt-4 px-4 w-full">
            <label htmlFor="search" className="text-base font-bold mb-2">Recherche par nom</label>
            <input
              type="text"
              name="name"
              id="search"
              placeholder="Saisir le nom du client"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border-2 border-gray-300 p-1 mb-4 font-bold w-full dark:text-white dark:bg-dark-800 dark:border-dark-800"
            />
          </form>
        )}

        {/* Éléments du menu */}
        <div className={`flex-grow flex ${isOpen ? 'grid grid-cols-2 gap-4 px-4' : 'flex flex-col items-center gap-6'} mt-6`}>
          {/* Réservations */}
          <Tippy content="Réservations" placement="right" disabled={isOpen}>
            <Link to={`/dashboard/reservations?dayselected=${dateSelected.toISOString().split('T')[0]}`} className={getLinkClass('/dashboard/reservations')}>
              <BsListCheck size={23} className="mb-1" />
              {isOpen && <h2 className="text-xs font-bold">Réservations</h2>}
            </Link>
          </Tippy>

          {/* Plan de table */}
          <Tippy content="Plan de table" placement="right" disabled={isOpen}>
            <Link to="/dashboard/table_plan" className={getLinkClass('/dashboard/table_plan')}>
              <LuLayoutDashboard size={23} className="mb-1" />
              {isOpen && <h2 className="text-xs font-bold">Plan de table</h2>}
            </Link>
          </Tippy>

          {/* Gestion clients */}
          <Tippy content="Gestion clients" placement="right" disabled={isOpen}>
            <Link to="/dashboard/clients" className={getLinkClass('/dashboard/clients')}>
              <FaUsers size={23} className="mb-1" />
              {isOpen && <h2 className="text-xs font-bold">Gestion clients</h2>}
            </Link>
          </Tippy>

          {/* Statistiques */}
          <Tippy content="Statistiques" placement="right" disabled={isOpen}>
            <Link to="/dashboard/analytics" className={getLinkClass('/dashboard/analytics')}>
              <IoMdStats size={23} className="mb-1" />
              {isOpen && <h2 className="text-xs font-bold">Statistiques</h2>}
            </Link>
          </Tippy>

          {/* Paramètres */}
          <Tippy content="Paramètres" placement="right" disabled={isOpen}>
            <Link to="/dashboard/settings" className={getLinkClass('/dashboard/settings')}>
              <FaGear size={23} className="mb-1" />
              {isOpen && <h2 className="text-xs font-bold">Paramètres</h2>}
            </Link>
          </Tippy>

          {/* Se déconnecter */}
          <Tippy content="Se déconnecter" placement="right" disabled={isOpen}>
            <Link to="/login" onClick={handleLogout} className={getLinkClass('/login')}>
              <MdLogout size={23} className="mb-1" />
              {isOpen && <h2 className="text-xs font-bold">Se déconnecter</h2>}
            </Link>
          </Tippy>
        </div>
      </div>

      {/* Bouton de bascule à l'extérieur du DashboardNav, positionné à droite comme une languette */}
      <button
        onClick={toggleNav}
        className={clsx(
          'fixed top-1/2 transform -translate-y-1/2 bg-white dark:bg-dark-800 p-2 border border-gray-100 dark:border-dark-700 rounded-md shadow-lg focus:outline-none transition-transform duration-300 ease-in-out z-60',
          isOpen ? 'left-[308px] -translate-x-1/2' : 'left-[83px] -translate-x-1/2'
        )}
      >
        {isOpen ? <MdArrowLeft size={20} /> : <MdArrowRight size={20} />}
      </button>
    </div>
  );
};
