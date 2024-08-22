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
        <nav className="fixed flex items-center justify-between top-0 w-full bg-black py-8 px-5 lg:px-10 z-10"
        aria-label='Menu principal'>
          <div className='text-white absolute'>
            <a href="#" className='hover:text-white'>
              <h1 className='bebas uppercase text-2xl lg:text-center'>La belle assiette</h1>
            </a>
          </div>
          <ul className={`fixed z-50 top-0 mt-5 right-0 w-full h-full flex flex-col justify-center items-center text-2xl font-bold bg-black text-white lg:static lg:mt-0 lg:flex-row lg:bg-transparent lg:mt-0 lg:justify-center lg:text-sm transition-transform duration-300 ${isMenuVisible ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 translate-none'}`}>
            <li><h1 className="pb-6 uppercase drop-shadow-xl lg:hidden"><a href='#' className='main-title text-center text-white hover:text-white' onClick={closeMenu}>La Belle Assiette</a></h1></li>
            <li className="p-4 lg:p-0"><h2 className='main-subtitle font-normal pb-5 lg:hidden'>Restaurant &nbsp;traditionnel</h2></li>
            <li className="lg:p-0"><a href="#about" className="hover:text-white block lg:inline uppercase hover:bg-green-800 hover:w-screen text-center py-5 px-5" onClick={closeMenu}>Le restaurant</a></li>
            <li className="lg:p-0"><a href="#menu" className="hover:text-white block lg:inline uppercase hover:bg-green-800 hover:w-screen text-center py-5 px-5" onClick={closeMenu}>La carte</a></li>
            <li className="lg:p-0"><a href="#contact" className="hover:text-white block lg:inline uppercase hover:bg-green-800 hover:w-screen text-center py-5 px-5" onClick={closeMenu}>Contact</a></li>
            <li className="lg:p-0"><a onClick={() => { openWidget(); closeMenu(); }} className="hidden lg:block hover:text-white block lg:inline cursor-pointer uppercase hover:bg-green-800 hover:w-screen text-center py-5 px-5">Réserver</a></li>
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
          <h1 className="main-title text-center text-white uppercase drop-shadow-xl">La Belle Assiette</h1>
          <p className="main-subtitle text-white text-center drop-shadow-xl">Restaurant &nbsp;traditionnel</p>
          <div className="flex gap-4 justify-center items-center mt-8">
            <button><a href="#menu" className='btn-green uppercase hover:text-white text-sm'>Voir la carte</a></button>
            <button><a onClick={openWidget} className='btn-light uppercase text-sm hover:text-black cursor-pointer'>Réserver en ligne</a></button>
          </div>
        </div>
      </header>

      <div id="about" className='bg-white py-16 px-4 flex flex-col justify-center items-center lg:h-screen'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center'>
          <div className='md:w-1/2'>
            <h2 className='main-subtitle text-3xl text-green-700 mb-8 text-center lg:text-left'>Notre Restaurant</h2>
            <p className='lg:text-xl text-black'>
              A la belle assiette, nous vous proposons une cuisine raffinée, préparée avec des ingrédients frais et de saison. Notre équipe
              dévouée est là pour vous offrir une expérience culinaire inoubliable, que ce soit pour un repas en famille,
              entre amis, ou pour un événement spécial.
            </p>
          </div>
          <div className='md:w-1/2 mt-8 md:mt-0 md:pl-8'>
            <img src="../../../public/img/cover-about.jpg" alt="Image du restaurant" className='w-full rounded-lg shadow-lg'/>
          </div>
        </div>
      </div>

      <div id="menu" className='bg-gray-100 py-16 px-4 flex flex-col justify-center items-center lg:h-screen'>
  <h1 className='main-subtitle text-black text-2xl mb-12 pt-12 text-green-700'>Découvrez notre carte</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
    
    <div className="rounded-lg shadow-lg bg-white">
      <img src="../../../public/img/entree.jpg" alt="Entrées" className="w-full h-90 object-cover rounded-t-lg mb-4"/>
      <h2 className='text-xl text-center font-bold mb-4'>Entrées</h2>
      <ul className='pl-5 pb-8'>
        <li className='mb-2'>- Salade de chèvre chaud</li>
        <li className='mb-2'>- Soupe à l'oignon gratinée</li>
        <li className='mb-2'>- Tartare de saumon</li>
      </ul>
    </div>

    <div className="bg-white rounded-lg shadow-lg">
      <img src="../../../public/img/plats.jpg" alt="Plats" className="w-full h-50 object-cover rounded-t-lg mb-4"/>
      <h2 className='text-xl font-bold mb-4 text-center'>Plats</h2>
      <ul className='pl-5 pb-8'>
        <li className='mb-2'>- Filet de bœuf sauce au poivre</li>
        <li className='mb-2'>- Poulet rôti à l'ail et au thym</li>
        <li className='mb-2'>- Risotto aux champignons</li>
      </ul>
    </div>

    <div className="bg-white rounded-lg shadow-lg">
      <img src="../../../public/img/dessert.jpg" alt="Desserts" className="w-full h-[295px] object-cover rounded-t-lg mb-4"/>
      <h2 className='text-xl font-bold mb-4 text-center'>Desserts</h2>
      <ul className='pl-5 pb-8'>
        <li className='mb-2'>- Tarte au citron meringuée</li>
        <li className='mb-2'>- Fondant au chocolat</li>
        <li className='mb-2'>- Crème brûlée</li>
      </ul>
    </div>

    <div className="bg-white rounded-lg shadow-lg">
      <img src="../../../public/img/boisson.jpg" alt="Boissons" className="w-full h-[300px] object-cover rounded-t-lg mb-4"/>
      <h2 className='text-xl font-bold mb-4 text-center'>Boissons</h2>
      <ul className='pl-5 pb-8'>
        <li className='mb-2'>- Vin rouge</li>
        <li className='mb-2'>- Vin blanc</li>
        <li className='mb-2'>- Jus de fruits</li>
      </ul>
    </div>

  </div>
</div>



<div id="contact" className='min-h-screen bg-black text-white flex flex-col justify-center items-center py-16 px-4'>
  <h1 className='main-subtitle text-white text-3xl mb-12 pt-10'>Nous contacter</h1>
  <form className='w-full max-w-lg rounded-lg shadow-lg'>
    <div className='flex flex-wrap -mx-3 mb-4'>
      <div className='w-full md:w-1/2 px-3 mb-4 md:mb-0'>
        <label className='block text-white text-sm font-bold mb-2' htmlFor='prenom'>
          Prénom
        </label>
        <input
          type='text'
          id='prenom'
          name='prenom'
          className='w-full px-3 py-2 text-black rounded-md'
          placeholder='Votre prénom'
          required
        />
      </div>
      <div className='w-full md:w-1/2 px-3'>
        <label className='block text-white text-sm font-bold mb-2' htmlFor='nom'>
          Nom
        </label>
        <input
          type='text'
          id='nom'
          name='nom'
          className='w-full px-3 py-2 text-black rounded-md'
          placeholder='Votre nom'
          required
        />
      </div>
    </div>
    <div className='mb-4'>
      <label className='block text-white text-sm font-bold mb-2' htmlFor='email'>
        E-mail
      </label>
      <input
        type='email'
        id='email'
        name='email'
        className='w-full px-3 py-2 text-black rounded-md'
        placeholder='Votre e-mail'
        required
      />
    </div>
    <div className='mb-4'>
      <label className='block text-white text-sm font-bold mb-2' htmlFor='message'>
        Message
      </label>
      <textarea
        id='message'
        name='message'
        rows={4}
        className='w-full px-3 py-2 text-black rounded-md'
        placeholder='Votre message'
        required
      ></textarea>
    </div>
    <div className='flex justify-end'>
      <button
        type='submit'
        className='bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      >
        Envoyer le message
      </button>
    </div>
  </form>
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

      <footer className="footer bottom-0 bg-black text-white w-full">
        <ul className='flex justify-center text-sm gap-5 py-5'>
          <li><a href="#" className='underline'>Accessibilité conforme</a></li>
          <li><a href="#" className='underline'>Politique de confidentialité</a></li>
          <li><a href="#" className='underline'>Conditions d'utilisations</a></li>
        </ul>
        <p className="text-center text-white text-sm py-5">Site créé par &nbsp;
          <a href="mailto:xavier.colombel@google.com?subject=Oresto%20-%20Contacter le développeur"
            className='font-bold hover:no-underline hover:text-white'>
            Xavier Colombel</a>
        </p>
      </footer>
    </div>
  );
};
