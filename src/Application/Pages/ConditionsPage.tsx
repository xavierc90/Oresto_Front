import { useEffect } from 'react';

export const ConditionsPage = () => {
  useEffect(() => {
    document.title = 'Oresto - Conditions d\'utilisations';
  }, []);

  return (
    <div className="flex flex-col items-center">      
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold mt-10">Nos conditions d'utilisation</h1>
      </div>
    </div>
  )
}
