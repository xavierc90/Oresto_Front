import React, { useState, useEffect } from 'react';

export const CookieBanner: React.FC = () => {
  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(false);

  useEffect(() => {
    // Vérifie si l'utilisateur a déjà accepté les cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setIsBannerVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsBannerVisible(false);
  };

  if (!isBannerVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white text-black p-4 flex items-center justify-between shadow-md z-50">
      <div className="text-sm">
        <p>
          Nous utilisons des cookies pour améliorer votre expérience. En continuant à utiliser ce site, vous acceptez nos{' '}
          <a href="/terms" target="_blank" className="underline font-bold">
            Conditions Générales
          </a>{' '}
          et notre{' '}
          <a href="/privacy-policy" target="_blank" className="underline font-bold">
            Politique de Confidentialité
          </a>.
        </p>
      </div>
      <div className="ml-4 flex gap-4">
        <button
          onClick={handleAccept}
          className="bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-green-800 transition duration-300"
        >
          J'accepte
        </button>
      </div>
    </div>
  );
};
