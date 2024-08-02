import { IoIosNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export const ManagerLine = () => {
  return (
    <div className="flex absolute right-20 top-12 gap-2">
        <IoIosNotifications size={30} />
        <div className="flex gap-3 justify-center items-center">
        <FaUserCircle size={28} />       
        <h2>John Doe</h2>
        <IoIosArrowDown size={20} />          
        </div> 
    </div>
  )
}