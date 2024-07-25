import { BsListCheck } from "react-icons/bs";

export const DashboardNav = () => {
  
  return (
    <div className='bg-light w-80 h-screen flex flex-col items-center shadow-2xl'>
      <div>
      <img src="../../../public/img/logo-oresto-red.png" width="230px" alt="Logo Oresto" />
      </div>
      
      {/* Recherche par date */}
      <div>
    <h2 className="text-lg font-bold mt-7 text-left">Recherche par date</h2>
    <img src="../../../public/img/calendar.png" width="220px" alt="" />
    </div>

      {/* Recherche par nom */}
    <div className="flex flex-col justify-center mt-4">
    <label className="text-lg font-bold px-12 mb-2">Recherche par nom</label>
    <input type="text" name="search" placeholder="Saisissez le nom du client" className="border-2 border-gray-300 p-2 mb-6 font-bold w-8/12 mx-12" />
    </div>
  )
}
