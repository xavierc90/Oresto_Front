import { FormResetPassword } from '../Components/FormResetPassword';
import { useEffect } from 'react';

export const LostPassword = () => {
  useEffect(() => {
    document.title = 'Oresto - Mot de passe perdu'; 
  }, []); 
  
  return (
    <div className='w-full h-screen flex'>
      <div className='w-6/12 bg-light'>
        <FormResetPassword />
      </div>
      <div className='cover-login w-6/12'>
      </div>
    </div>
  )
}