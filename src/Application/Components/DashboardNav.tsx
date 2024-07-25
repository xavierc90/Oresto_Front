import { BsListCheck } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GrAnalytics } from "react-icons/gr";
import { GrConfigure } from "react-icons/gr";
import { GoTable } from "react-icons/go";



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
      <div className="mt-10">
      <img src="../../../public/img/logo-oresto-red.png" width="240px" alt="Logo Oresto" />
      </div>
      
      {/* Recherche par date */}
      <div className="mt-10">
      <CalendarShadcn mode={"single"} selected={dateSelected} onSelect={setDateSelected} required/>
    </div>

      {/* Recherche par nom */}
    <div className="flex flex-col justify-center mt-4">
    <label className="text-sm font-bold px-12 mb-2">Recherche par nom</label>
    <input type="text" name="search" placeholder="Saisir le nom du client" className="border-2 border-gray-300 p-2 mb-6 font-bold w-60 mx-12" />
    </div>

        {/* Menu Manager */}
        <div className="flex flex-col justify-center mt-4">
          <div className="flex flex-col justify-center items-center">
            <BsListCheck size={40}/>
            <h2 className="font-bold text-xs">Réservations</h2>
          </div>

          <div className="flex flex-col justify-center items-center">
            <GoTable size={30}/>
            <h2 className="font-bold text-xs">Plan de tables</h2>
          </div>

          <div className="flex flex-col justify-center items-center">
            <FaUser size={30}/>
            <h2 className="font-bold text-xs">Gestion clients</h2>
          </div>

          <div className="flex flex-col justify-center items-center">
            <GrAnalytics size={30}/>
            <h2 className="font-bold text-xs">Statistiques</h2>
          </div>

          <div className="flex flex-col justify-center items-center">
            <GrConfigure size={30}/>
            <h2 className="font-bold text-xs">Paramètres</h2>
          </div>

          <div className="flex flex-col justify-center items-center">
            <BsListCheck size={40}/>
            <h2 className="font-bold text-xs">Se déconnecter</h2>
          </div>
        </div>
        </div>
  )
}
