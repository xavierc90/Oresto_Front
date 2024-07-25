import { BsListCheck } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { IoMdStats } from "react-icons/io";
import { FaGear } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { NavLink } from 'react-router-dom';

import {CalendarShadcn} from "../Components/CalendarShadcn.tsx";
import {useEffect, useState} from 'react';


export const DashboardNav = () => {

  const [dateSelected, setDateSelected] = useState<Date>(new Date())
  
  useEffect(() => {
      console.log(dateSelected.toLocaleDateString())
    // requete api avec la date selectionnée
  }, [dateSelected]);
  
  
  return (
    <div className='bg-light w-80 h-screen flex flex-col items-center shadow-2xl'>
      <div className="mt-12">
      <img src="../../../public/img/logo-oresto-red.png" width="230px" alt="Logo Oresto" />
      </div>
      
      {/* Recherche par date */}
      <div className="mt-12">
      <CalendarShadcn mode={"single"} selected={dateSelected} onSelect={setDateSelected} required/>
    </div>

      {/* Recherche par nom */}
    <div className="flex flex-col justify-center mt-8">
    <label className="text-sm font-bold px-12 mb-4">Recherche par nom</label>
    <input type="text" name="search" placeholder="Saisir le nom du client" className="border-2 border-gray-300 p-2 mb-6 font-bold w-60 mx-12" />
    </div>
    
    <div className="grid grid-cols-2 gap-6 justify-items-center mt-4">
      {/* Premier Élément */}
      <NavLink
        to="/dahboard/bookings"
        className="flex flex-col items-center text-gray-600 hover:text-red-500 focus:text-red-500 transition duration-300 active">
        <BsListCheck size={30} className="mb-1" />
        <h2 className="text-xs font-bold active">Réservations</h2>
      </NavLink>

      {/* Deuxième Élément */}
      <NavLink
        to="/dahboard/layouts"
        className="flex flex-col items-center text-gray-600 hover:text-red-500 focus:text-red-500 transition duration-300">
        <LuLayoutDashboard size={30} className="mb-1" />
        <h2 className="text-xs font-bold">Plan de tables</h2>
      </NavLink>

      {/* Troisième Élément */}
      <NavLink
        to="/dahboard/clients"
        className="flex flex-col items-center text-gray-600 hover:text-red-500 focus:text-red-500 transition duration-300">
        <FaUsers size={30} className="mb-1" />
        <h2 className="text-xs font-bold">Gestion clients</h2>
      </NavLink>

      {/* Quatrième Élément */}
      <NavLink
        to="/dahboard/analytics"
        className="flex flex-col items-center text-gray-600 hover:text-red-500 focus:text-red-500 transition duration-300">
        <IoMdStats size={30} className="mb-1" />
        <h2 className="text-xs font-bold">Statistiques</h2>
      </NavLink>

      {/* Cinquième Élément */}
      <NavLink
        to="/dahboard/settings"
        className="flex flex-col items-center text-gray-600 hover:text-red-500 focus:text-red-500 transition duration-300">
        <FaGear size={30} className="mb-1" />
        <h2 className="text-xs font-bold">Paramètres</h2>
      </NavLink>

      {/* Sixième Élément */}
      <NavLink
        to="/login"
        className="flex flex-col items-center text-gray-600 hover:text-red-500 focus:text-red-500 transition duration-300"
      >
        <MdLogout size={30} className="mb-1" />
        <h2 className="text-xs font-bold">Se déconnecter</h2>
      </NavLink>
    </div>
        </div>
  )
}
