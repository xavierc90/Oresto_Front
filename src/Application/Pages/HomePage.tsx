import { useEffect, useState } from 'react';
import { Widget } from '../Components/Widget/Widget';
import { RxHamburgerMenu } from "react-icons/rx";

export const HomePage = () => {
  const [showWidget, setShowWidget] = useState(true); // Afficher le widget par défaut
  const [isWidgetContentVisible, setIsWidgetContentVisible] = useState(false); // Masquer le contenu du widget par défaut

  // Ouvre le widget et réinitialise la visibilité du contenu
  const openWidget = () => {
    setShowWidget(true);
    setIsWidgetContentVisible(true);
  };

  // Met à jour le titre de la page
  useEffect(() => {
    document.title = 'La belle assiette - Restaurant traditionnel';
  }, []);

  return (
    <div>
      <header className='flex flex-col justify-center items-center'>
        <nav className="flex lg:items-center items-start justify-start lg:justify-center fixed top-0 w-full bg-black py-8">
          <div className='absolute left-5 lg:left-10 text-white text-center'>
            <a href="#" className='hover:text-white'>
              <h1 className='bebas uppercase font-bold lg:text-2xl text-xl pl-5'>La belle assiette</h1>
            </a>
          </div>
          <ul className="text-white hidden mg:hidden lg:block lg:flex text-lg font-bold uppercase lg:justify-center gap-10">
            <li><a href="#about" className="hover:text-white">Le restaurant</a></li>
            <li><a href="#menu" className="hover:text-white">La carte</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
            <li><a onClick={openWidget} className="hover:text-white cursor-pointer">Réserver</a></li>
          </ul>
          <div className="absolute lg:hidden right-5 lg:right-10 text-white">
            <RxHamburgerMenu className="w-8 h-8 cursor-pointer" />
          </div>
        </nav>

        <div>
          <h1 className="main-title text-center text-white uppercase">La Belle Assiette</h1>
          <p className="main-subtitle text-white text-center">Restaurant traditionnel</p>
          <div className="flex gap-4 justify-center items-center mt-8">
            <button><a href="#menu" className='btn-green uppercase hover:text-white'>Voir la carte</a></button>
            <button><a onClick={openWidget} className='btn-light uppercase hover:text-black cursor-pointer'>Réserver en ligne</a></button>
          </div>
        </div>
      </header>

      <div id="about" className='h-screen bg-black flex justify-center items-center'>
        <h1 className='text-white text-4xl uppercase'>Notre restaurant</h1>
      </div>

      <div id="menu" className='h-screen bg-white text-black flex justify-center items-center'>
        <h1 className='text-black text-4xl uppercase'>Découvrez notre carte</h1>
      </div>

      <div id="contact" className='h-screen bg-black text-black flex justify-center items-center'>
        <h1 className='text-white text-4xl uppercase'>Contact</h1>
      </div>

      {showWidget && (
        <div className='widget-container'>
          <Widget 
            setShowWidget={setShowWidget} 
            isContentVisible={isWidgetContentVisible}
            setIsContentVisible={setIsWidgetContentVisible} 
          />
        </div>
      )}

      <footer className="footer bottom-0 bg-green-900 text-white p-4 w-full">
        <p className="text-center text-white">Site créé par &nbsp;
          <a href="mailto:xavier.colombel@google.com?subject=Oresto%20-%20Contacter le développeur"
            className='font-bold hover:no-underline hover:text-white'>
            Xavier Colombel</a>
        </p>
      </footer>
    </div>
  );
};
