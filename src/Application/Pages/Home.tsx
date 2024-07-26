import { useEffect } from 'react';
import { Navbar } from '../Components/Navbar';

export const Home = () => {
  useEffect(() => {
    document.title = 'La belle assiette - Restaurant traditionnel';
  }, []);

  return (
    <div>
    <header className='flex flex-col justify-center items-center'>
      <Navbar />
      <div className=''>
        <h1 className="main-title text-center text-white uppercase">La Belle Assiette</h1>
        <p className="main-subtitle text-white text-center">Restaurant &nbsp;traditionnel</p>
        <div className='flex gap-4 justify-center items-center'>
        <a href="#about" className='btn-green uppercase hover:text-white'>Voir la carte</a>
        <a href="/menu" className='btn-light uppercase hover:text-black'>Réserver en ligne</a>
        </div>
      </div>
    </header>

    <div id="about" className='h-screen bg-black flex justify-center items-center'>
        <h1 className='text-white text-4xl uppercase'>Notre restaurant</h1>
    </div>

    <div id="menu" className='h-screen bg-white text-black flex justify-center items-center'>
        <h1 className='text-black text-4xl uppercase'>Le menu</h1>
    </div>

    <footer className="footer bottom-0 bg-black text-white p-4 w-full">
        <p className="text-center text-white">Site créé par Xavier Colombel</p>
    </footer>
    
    </div>
  )
}
