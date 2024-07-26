import { DashboardNav } from '../Components/DashboardNav'
import {useEffect, useState} from 'react';
import {CalendarShadcn} from "../Components/CalendarShadcn.tsx";

export const Dashboard = () => {
  const [dateSelected, setDateSelected] = useState<Date>(new Date())
  
  useEffect(() => {
      console.log(dateSelected.toLocaleDateString())
    // requete api avec la date selectionnée
  }, [dateSelected]);
  
  useEffect(() => {
    document.title = 'Oresto - Gestion des réservations';
  }, []);

  return (
      <div className={"flex"}>
        <DashboardNav />
        <CalendarShadcn mode={"single"} selected={dateSelected} onSelect={setDateSelected} required/>
      </div>
  )
}
