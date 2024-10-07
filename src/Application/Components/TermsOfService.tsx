import React from 'react';
import { IoCloseOutline } from "react-icons/io5";

interface TermsOfServiceProps {
  onClose: () => void;
}

const currentDate = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md max-w-4xl w-full relative overflow-y-auto max-h-screen">
      <div className='absolute top-5 right-5 cursor-pointer'>
        <IoCloseOutline 
        onClick={onClose}
        size={30} />
        </div>
        
        {/* Titre */}
        <h2 className="text-xl text-center font-semibold">Conditions générales d'utilisation (CGU)</h2>
        <p className="mb-4 text-center">Dernière mise à jour le {currentDate}</p>
        
        {/* Contenu des CGU */}
        <div className="space-y-4 text-left">
          <h3 className="text-lg font-bold">1. Objet :</h3>
          <p>
            Oresto est une application permettant aux utilisateurs de réserver des tables dans des restaurants partenaires. 
            Les présentes conditions définissent les droits et obligations des utilisateurs et des restaurants partenaires.
          </p>
          
          <h3 className="text-lg font-bold">2. Inscription :</h3>
          <p>
            Pour utiliser les services de réservation, vous devez créer un compte en fournissant des informations personnelles telles que votre nom, prénom, adresse email et numéro de téléphone. 
            Ces informations doivent être exactes et à jour.
          </p>
          
          <h3 className="text-lg font-bold">3. Utilisation des services :</h3>
          <p>
            L'utilisateur peut rechercher un restaurant, consulter les horaires disponibles et effectuer une réservation. 
            Une fois la réservation confirmée, un email ou un message de confirmation sera envoyé. 
            Il est de la responsabilité de l'utilisateur de vérifier les informations de la réservation.
          </p>
          
          <h3 className="text-lg font-bold">4. Modification ou annulation de la réservation :</h3>
          <p>
            Les utilisateurs peuvent modifier ou annuler une réservation dans les délais spécifiés par le restaurant partenaire. 
            En dehors de ces délais, des frais d'annulation peuvent s'appliquer selon les règles de chaque restaurant.
          </p>
          
          <h3 className="text-lg font-bold">5. Responsabilité :</h3>
          <p>
            <strong>Responsabilité de l'utilisateur : </strong> 
            L'utilisateur s'engage à fournir des informations exactes lors de la réservation et à respecter les conditions d'annulation des restaurants.
          </p>
          <p>
            <strong>Responsabilité de Oresto : </strong> 
            Oresto n'est responsable que de la mise à disposition de la plateforme de réservation. 
            Nous ne sommes pas responsables des services fournis par les restaurants.
          </p>
          
          <h3 className="text-lg font-bold">6. Propriété intellectuelle :</h3>
          <p>
            Tous les éléments de l'application Oresto, y compris les textes, images, logos, et fonctionnalités, 
            sont protégés par les lois sur la propriété intellectuelle. Toute reproduction ou utilisation non autorisée est interdite.
          </p>
          
          <h3 className="text-lg font-bold">7. Résiliation :</h3>
          <p>
            Oresto se réserve le droit de résilier un compte utilisateur en cas de violation des présentes conditions générales.
          </p>
          
          <h3 className="text-lg font-bold">8. Modifications des CGU :</h3>
          <p>
            Oresto se réserve le droit de modifier ces conditions à tout moment. 
            Les utilisateurs seront informés de toute modification et devront accepter les nouvelles conditions pour continuer à utiliser l'application.
          </p>
          
          <h3 className="text-lg font-bold">9. Loi applicable :</h3>
          <p>
            Ces conditions générales sont régies par la loi française. 
            En cas de litige, les parties s'efforceront de trouver une solution amiable avant de recourir aux tribunaux compétents.
          </p>
        </div>
        
        {/* Bouton pour revenir sur le site */}
        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="bg-black text-white font-semibold py-2 px-6 rounded-md hover:bg-orange-400 transition duration-300 text-sm"
          >
            Revenir sur le site
          </button>
        </div>
      </div>
    </div>
  );
};
