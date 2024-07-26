import { useState } from 'react';
import { useEffect } from 'react';
import { Widget } from '../Components/Widget';

export const HomePage = () => {

  const [showWidget, setShowWidget] = useState(false);
  
  const handleCLick = () => {
    setShowWidget(!showWidget);
  }

  useEffect(() => {
    document.title = 'La belle assiette - Restaurant traditionnel';
  }, []);

  return (
    <div>
    <header className='flex flex-col justify-center items-center'>
  
    <div className="fixed top-0 w-full bg-black py-7">
        <ul className="text-white text-xl font-bold uppercase flex gap-12 justify-center">
            <li><a href="#about" className="hover:text-white">Notre restaurant</a></li>
            <li><a href="#menu" className="hover:text-white">Le menu</a></li>
            <li>Contact</li>
        </ul>
    </div>

      <div>
        <h1 className="main-title text-center text-white uppercase">La Belle Assiette</h1>
        <p className="main-subtitle text-white text-center">Restaurant &nbsp;traditionnel</p>
        <div className="flex gap-4 justify-center items-center mt-8">
        <a href="#about" className='btn-green uppercase hover:text-white'>Voir la carte</a>
        <a onClick={handleCLick} className='btn-light uppercase hover:text-black cursor-pointer'>Réserver en ligne</a>
        </div>
      </div>
    </header>

    <div id="about" className='h-screen bg-black flex justify-center items-center'>
        <h1 className='text-white text-4xl uppercase'>Notre restaurant</h1>
    </div>

    <div id="menu" className='h-screen bg-white text-black flex justify-center items-center'>
        <h1 className='text-black text-4xl uppercase'>Le menu</h1>
    </div>

    {showWidget && (
          <div className='widget-container'>
          <Widget />
        </div>
      )}

    <footer className="footer bottom-0 bg-black text-white p-4 w-full">
        <p className="text-center text-white">Site créé par Xavier Colombel</p>
    </footer>
    
    </div>
  )
}
