import { RegisterForm } from '../Components/Form/RegisterForm'
import { useEffect } from 'react';

export const RegisterPage = () => {
  useEffect(() => {
    document.title = 'Oresto - Créer un compte professionnel'; 
  }, []); 
  
  return (
    <div className='w-full h-screen flex'>
      <div className='w-6/12 bg-light'>
        <RegisterForm />
      </div>
      <div className='cover-login w-6/12'>
      </div>
    </div>
  )
}