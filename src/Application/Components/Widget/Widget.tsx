import { LoginFormUser } from './LoginFormUser';
import { RegisterFormUser } from './RegisterFormUser';
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";

export const Widget = () => {
  return (
    <div 
    className="border-1 shadow-2xl border-gray-300 fixed bottom-0 
    right-10 bottom-0 flex items-center justify-center
    ">
      <div>
        <div 
        className='flex justify-between items-center bg-green-800 top-0 w-auto text-white py-3 pl-4 rounded-t-xl'>
          Réserver en ligne
          <div className='flex gap-2 mr-4'>
              <a href="" className='hover:text-white'><IoIosArrowDown size={20} /></a>
              <a href="" className='hover:text-white'><RxCross1 size={20} /></a>
          </div>
              </div>
              <LoginFormUser />
              {/* <RegisterFormUser /> */}


      </div>
    </div>
  );
};