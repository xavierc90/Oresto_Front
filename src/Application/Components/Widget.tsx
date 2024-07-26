import {LoginFormUser} from './LoginFormUser';

export const Widget = () => {
  return (
    <div className="border-1 shadow-2xl border-gray-300 fixed bottom-0 right-10 bottom-0 flex items-center justify-center">
      <div>
        <div className='bg-green-800 top-0 w-80 text-white py-3 pl-4 rounded-t-xl'>Réserver en ligne</div>
            <LoginFormUser />
      </div>
    </div>
  );
};