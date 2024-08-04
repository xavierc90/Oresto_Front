import { useEffect, useState } from 'react';
import { Widget } from '../Components/Widget/Widget';
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx"; // Importer les icônes

export const HomePage = () => {
  const [showWidget, setShowWidget] = useState(true); // Masquer le widget par défaut
  const [isWidgetContentVisible, setIsWidgetContentVisible] = useState(false); // Masquer le contenu du widget par défaut
  const [isMenuVisible, setIsMenuVisible] = useState(false); // État pour la visibilité du menu

  const openWidget = () => {
    setShowWidget(true);
    setIsWidgetContentVisible(true);
  };

   const toggleWidgetContentVisibility = () => {
    setIsWidgetContentVisible(!isWidgetContentVisible);
  };

  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  // Ajoute ou enlève la classe 'overflow-hidden' au body pour désactiver le défilement
  useEffect(() => {
    if (isMenuVisible) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMenuVisible]);

  return (
    <div>
      <header className='flex flex-col justify-center items-center'>
        <nav className="fixed flex items-center justify-between top-0 w-full bg-black py-8 px-5 lg:px-10">
          <div className='text-white absolute'>
            <a href="#" className='hover:text-white'>
              <h1 className='bebas uppercase font-bold text-2xl lg:text-center'>La belle assiette</h1>
            </a>
          </div>
          <ul className={`fixed z-50 top-12 mt-5 right-0 w-full h-full flex flex-col justify-center items-center text-2xl font-bold uppercase bg-black text-white lg:static lg:mt-0 lg:flex-row lg:bg-transparent lg:gap-10 lg:items-center lg:justify-center lg:text-sm   transition-transform duration-300 ${isMenuVisible ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 translate-none ransform-none'}`}>
            <li className="p-4 lg:p-0"><a href="#about" className="hover:text-white block lg:inline" onClick={closeMenu}>Le restaurant</a></li>
            <li className="p-4 lg:p-0"><a href="#menu" className="hover:text-white block lg:inline" onClick={closeMenu}>La carte</a></li>
            <li className="p-4 lg:p-0"><a href="#contact" className="hover:text-white block lg:inline" onClick={closeMenu}>Contact</a></li>
            <li className="p-4 lg:p-0"><a onClick={() => { openWidget(); closeMenu(); }} className="hover:text-white block lg:inline cursor-pointer">Réserver</a></li>
          </ul>
          <div className="absolute right-5 lg:hidden text-white z-50">
            {isMenuVisible ? (
              <RxCross1 className="w-8 h-8 cursor-pointer" onClick={toggleMenuVisibility} />
            ) : (
              <RxHamburgerMenu className="w-8 h-8 cursor-pointer" onClick={toggleMenuVisibility} />
            )}
          </div>
        </nav>

        <div className="mt-20 lg:mt-0">
          <h1 className="main-title text-center text-white uppercase">La Belle Assiette</h1>
          <p className="main-subtitle text-white text-center">Restaurant traditionnel</p>
          <div className="flex gap-4 justify-center items-center mt-8">
            <button><a href="#menu" className='btn-green uppercase hover:text-white text-sm'>Voir la carte</a></button>
            <button><a onClick={openWidget} className='btn-light uppercase text-sm hover:text-black cursor-pointer'>Réserver en ligne</a></button>
          </div>
        </div>
      </header>

      <div id="about" className='h-screen bg-black flex justify-center items-center'>
        <h1 className='text-white text-2xl uppercase'>Notre restaurant</h1>
      </div>

      <div id="menu" className='h-screen bg-white text-black flex justify-center items-center'>
        <h1 className='text-black text-2xl uppercase'>Découvrez notre menu</h1>
      </div>

      <div id="contact" className='h-screen bg-black text-black flex justify-center items-center'>
        <h1 className='text-white text-2xl uppercase'>Nous contacter</h1>
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

      <footer className="footer bottom-0 bg-black text-white p-4 w-full">
        <p className="text-center text-white text-sm">Site créé par &nbsp;
          <a href="mailto:xavier.colombel@google.com?subject=Oresto%20-%20Contacter le développeur"
            className='font-bold hover:no-underline hover:text-white'>
            Xavier Colombel</a>
        </p>
      </footer>
    </div>
  );
};
