import { BsListCheck } from "react-icons/bs";
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
      <div>
      <img src="../../../public/img/logo-oresto-red.png" width="240px" alt="Logo Oresto" />
      </div>
      
      {/* Recherche par date */}
      <div className="mt-8">
      <CalendarShadcn mode={"single"} selected={dateSelected} onSelect={setDateSelected} required/>
    </div>

      {/* Recherche par nom */}
    <div className="flex flex-col justify-center mt-4">
    <label className="text-lg font-bold px-12 mb-2">Recherche par nom</label>
    <input type="text" name="search" placeholder="Saisissez le nom du client" className="border-2 border-gray-300 p-2 mb-6 font-bold w-8/12 mx-12" />
    </div>
  </div>
  )
}
