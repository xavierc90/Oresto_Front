// DashboardNav.tsx

import { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsListCheck } from "react-icons/bs";
import { FaUsers, FaCalendarAlt, FaSearch } from "react-icons/fa"; // Import de FaCalendarAlt et FaSearch
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
  const [isOpen, setIsOpen] = useState<boolean>(window.innerWidth >= 1024); // Initialisé en fonction de la taille de la fenêtre
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Référence au champ de recherche
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // État pour déterminer si le champ de recherche doit être mis au point
  const [shouldFocusSearch, setShouldFocusSearch] = useState<boolean>(false);

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

  useEffect(() => {
    if (isOpen && shouldFocusSearch && searchInputRef.current) {
      searchInputRef.current.focus();
      setShouldFocusSearch(false); // Réinitialiser l'état après le focus
    }
  }, [isOpen, shouldFocusSearch]);

  // Fonction pour gérer le redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // 'lg' breakpoint
        setIsOpen(true);
        setIsNavOpen(true);
      } else {
        setIsOpen(false);
        setIsNavOpen(false);
      }
    };

    // Appel initial pour définir l'état en fonction de la taille actuelle de la fenêtre
    handleResize();

    // Ajout de l'écouteur d'événements
    window.addEventListener('resize', handleResize);

    // Nettoyage de l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsNavOpen]);

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
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    setIsNavOpen(newIsOpen); // Met à jour l'état dans DashboardPage
    if (!newIsOpen) {
      setShouldFocusSearch(false); // Réinitialiser si le menu est fermé
    }
  };

  const openNavAndFocusSearch = () => {
    setIsOpen(true);
    setIsNavOpen(true);
    setShouldFocusSearch(true);
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
          <div className='mt-10 flex flex-col items-center'>
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
          <form className="flex flex-col items-center mt-4 px-4 w-full">
            <label htmlFor="search" className="text-base text-left font-bold mb-2">Recherche par nom</label>
            <input
              type="text"
              name="name"
              id="search"
              placeholder="Saisir le nom du client"
              value={searchTerm}
              onChange={handleSearchChange}
              ref={searchInputRef} // Assignation de la référence
              className="border-2 border-gray-300 p-1 mb-4 font-bold w-[220px] dark:text-white dark:bg-dark-800 dark:border-dark-800"
            />
          </form>
        )}

        {/* Éléments du menu */}
        <div className={`flex-grow flex ${isOpen ? 'grid grid-cols-2 gap-4 px-4' : 'flex flex-col justify-center items-center gap-8'} mt-6`}>
          {/* Nouvel élément : Calendrier (Agenda) - Positionné au-dessus des autres icônes */}
          {!isOpen && (
            <Tippy content="Afficher le calendrier" placement="right">
              <button
                onClick={toggleNav} // Ouvre le DashboardNav
                className="flex flex-col items-center text-gray-600 hover:text-red-500 dark:hover:text-white transition duration-300 focus:outline-none"
              >
                <FaCalendarAlt size={23} className="mb-1" />
              </button>
            </Tippy>
          )}

          {/* Nouvel élément : Loupe (Recherche) - Positionnée en dessous des autres icônes */}
          {!isOpen && (
            <Tippy content="Rechercher un client" placement="right">
              <button
                onClick={openNavAndFocusSearch} // Ouvre le DashboardNav et met le focus sur le champ de recherche
                className="flex flex-col items-center text-gray-600 hover:text-red-500 dark:hover:text-white transition duration-300 focus:outline-none"
              >
                <FaSearch size={23} className="mb-1" />
              </button>
            </Tippy>
          )}

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
      <Tippy content="Afficher / Masquer le menu" placement="right">
        <button
          onClick={toggleNav}
          className={clsx(
            'fixed top-1/2 transform -translate-y-1/2 bg-white dark:bg-dark-800 p-2 dark:border-dark-700 rounded-md shadow-lg focus:outline-none transition-transform duration-300 ease-in-out bg-opacity-100 z-50',
            isOpen ? 'top-5 left-[308px] -translate-x-1/2' : 'top-5 left-[83px] -translate-x-1/2'
          )}
        >
          {isOpen ? <MdArrowLeft size={25} /> : <MdArrowRight size={25} />}
        </button>
      </Tippy>
    </div>
  );
};
