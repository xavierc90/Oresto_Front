import { LoginForm } from '../Components/Form/LoginForm';
import { useEffect } from 'react';

export const LoginPage = () => {
  useEffect(() => {
    document.title = 'Oresto - Se connecter'; 
  }, []); 
  
  return (
    <div className='w-full h-screen flex'>
      <div className='w-6/12 bg-light'>
        <LoginForm />
      </div>
      <div className='cover-login w-6/12'>
      mllkml
      </div>
    </div>
  )
}