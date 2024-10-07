// src/components/CookieBanner.tsx
import React, { useState, useEffect } from 'react';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfService } from './TermsOfService';

export const CookieBanner: React.FC = () => {
  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);
  const [isTermsOpen, setIsTermsOpen] = useState<boolean>(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setIsBannerVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsBannerVisible(false);
  };

  return (
    <>
      {isBannerVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-white text-black p-4 flex flex-col md:flex-row items-center justify-between shadow-md z-50">
          <div className="text-sm flex flex-col md:flex-row gap-2">
            <p className='text-center'>
              Nous utilisons des cookies pour améliorer votre expérience. En continuant à utiliser ce site, vous acceptez nos{' '}
              <button
                onClick={() => setIsTermsOpen(true)}
                className="underline font-bold hover:text-green-800"
              >
                Conditions Générales
              </button>{' '}
              et notre{' '}
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="underline font-bold hover:text-green-800"
              >
                Politique de Confidentialité
              </button>.
            </p>
          </div>
          <div className="mt-4 md:mt-0 ml-0 md:ml-4 flex gap-4">
            <button
              onClick={handleAccept}
              className="w-[150px] bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-green-800 transition duration-300 text-sm"
            >
              J'ai compris
            </button>
          </div>
        </div>
      )}

      {/* Modal pour la Politique de Confidentialité */}
      {isPrivacyOpen && (
        <PrivacyPolicy onClose={() => setIsPrivacyOpen(false)} />
      )}

      {/* Modal pour les Conditions Générales */}
      {isTermsOpen && (
        <TermsOfService onClose={() => setIsTermsOpen(false)} />
      )}
    </>
  );
};
