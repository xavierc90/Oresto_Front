import React, { useState, useEffect } from 'react';
import moment from 'moment';  // Assurez-vous d'importer moment
import { http } from '../../../Infrastructure/Http/axios.instance';
import { CalendarShadcn } from '../Dashboard/CalendarShadcn';
import { useAuth } from '../../../Module/Auth/useAuth'; 
import { AiOutlineCalendar } from 'react-icons/ai';

type ReservationProps = {
  selectedDate: Date | null;
  onTimeSelected: () => void;
  onReturnToAccount: () => void;
};

export const Reservation: React.FC<ReservationProps> = ({ selectedDate, onReturnToAccount }) => {
  const { user, token } = useAuth();
  const [step, setStep] = useState<'selectDate' | 'selectTime' | 'confirm' | 'success'>('selectDate');
  const [timeSelected, setTimeSelected] = useState<string | null>(null);
  const [localDate, setLocalDate] = useState<Date>(selectedDate ?? new Date());  
  const [nbrPersons, setNbrPersons] = useState(1);
  const [additionalInfo, setAdditionalInfo] = useState<string>(''); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reservationDetails, setReservationDetails] = useState<any>(null);

  useEffect(() => {
    document.title = 'Oresto - Réservation';
    if (!selectedDate) {
      setLocalDate(new Date());
    }
  }, [selectedDate]);

  const validateDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const handleDateSelect = (date: Date) => {
    setLocalDate(date);
    if (validateDate(date)) {
      setErrorMessage(null);  
    } else {
      setErrorMessage("Date non valide");
    }
  };

  const handleDateConfirm = () => {
    if (validateDate(localDate)) {
      setErrorMessage(null);
      setStep('selectTime');
    } else {
      setErrorMessage("Sélectionnez une date valide.");
    }
  };

  const handleTimeSelect = (time: string) => {
    setTimeSelected(time);
  };

  const handleConfirm = () => {
    if (timeSelected && localDate) {
      setStep('confirm');
    }
  };

  const handleFinalConfirmation = async () => {
    try {
      // Convertir la date locale en format UTC pour l'envoyer au serveur
      const formattedDate = moment(localDate).format('YYYY-MM-DD');
      const reservationData = {
        date_selected: formattedDate,
        time_selected: timeSelected,
        nbr_persons: nbrPersons,
        user_id: user?._id,
        details: additionalInfo,
      };
      console.log("Données envoyées :", reservationData);
  
      const response = await http.post('/add_reservation', reservationData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Réponse du backend :", response.data);  // Ajoutez ceci pour afficher la réponse du backend
  
      if (response.status === 201) {
        setReservationDetails(response.data);  // Enregistrer les détails de la réservation, y compris le table_number
        setStep('success');
      } else {
        console.log("Erreur lors de la réservation :", response.data);
        setErrorMessage("Erreur lors de la réservation, veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
      setErrorMessage("Erreur lors de la réservation, veuillez réessayer.");
    }
  };

  const incrementNbrPersons = () => setNbrPersons(prev => prev + 1);
  const decrementNbrPersons = () => setNbrPersons(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div>
      {step === 'selectDate' && (
        <>
        <div className='flex flex-col justify-center items-center gap-3 lg:gap-0 mt-12 lg:mt-0'>
          <h2 className="text-3xl lg:text-lg font-bold mb-4">Choisissez la date</h2>

          <p className=' pb-7'>
            <h3 className='font-semibold text-xl lg:text-sm'>Horaires du restaurant</h3>
            <span className='w-20 text-xl lg:text-sm'>Ouvert du lundi au vendredi <br/>
            11:30 - 14:30 / 19:30 - 23:00</span>

            </p>
          <CalendarShadcn 
            mode="single" 
            selected={localDate}
            onSelect={handleDateSelect} 
            required={true}
            interfaceType='client'
            className=''
          />
          {errorMessage && (
            <p className="text-red-600 font-semibold">{errorMessage}</p>
          )}
          <button
            className={`bg-black text-white text-lg lg:text-sm font-semibold py-3 lg:py-2 lg:px-4 rounded-lg mt-4 w-full ${
              !validateDate(localDate) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleDateConfirm}
            disabled={!validateDate(localDate)}
          >
            Sélectionner l'heure
          </button>
          <div className="mt-8 lg:mt-2  text-center">
            <button className="text-black lg:text-sm text-xl font-semibold lg:font-normal" onClick={onReturnToAccount}>
              Retour à l'accueil
            </button>
           </div>
          </div>
        </>
      )}
      
      {step === 'selectTime' && (
  <>
  <div className='flex flex-col items-center justify-center mt-12 lg:mt-0'>
    <h2 className="text-3xl pt-12 lg:pt-0 lg:text-lg font-bold mb-4">Choisissez l'heure</h2>
    <div className="flex items-center justify-center text-green-800 mb-1 text-xl lg:text-lg">
      <AiOutlineCalendar 
        className="mr-2 cursor-pointer" 
        onClick={() => setStep('selectDate')}
      />
      <span>
        {localDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </span>
    </div>
  </div>
    {/* Ajouter un lien pour modifier la date */}
    <div className="text-center mb-2">
      <button
        className="text-lg lg:text-sm text-green-800 font-semibold"
        onClick={() => setStep('selectDate')}
      >
        Modifier la date
      </button>
    </div>
    <h3 className="font-bold text-2xl lg:text-lg mb-4 pt-4">Repas du midi</h3>
    <div className="grid grid-cols-4 lg:grid-cols-4 gap-2 mb-4 font-semibold">
      {['12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45'].map(time => (
        <button
          key={time}
          className={`flex justify-center items-center py-4 lg:py-2 lg:px-4 text-center rounded-lg text-xl lg:text-base lg:py-3 lg:px-5 ${timeSelected === time ? 'bg-green-800 text-white' : 'bg-gray-300 text-black'}`}
          onClick={() => handleTimeSelect(time)}
        >
          {time}
        </button>
      ))}
    </div>
    <h3 className="font-bold text-2xl lg:text-lg mb-4 pt-4">Repas du soir</h3>
    <div className="grid grid-cols-4 lg:grid-cols-4 gap-2 font-semibold">
      {['20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45'].map(time => (
        <button
          key={time}
          className={`flex justify-center items-center py-4 px-4 lg:py-2 lg:px-4 text-center rounded-lg text-xl lg:text-base lg:py-3 lg:px-5 ${timeSelected === time ? 'bg-green-800 text-white' : 'bg-gray-300 text-black'}`}
          onClick={() => handleTimeSelect(time)}
        >
          {time}
        </button>
      ))}
    </div>
    <button
      className={`bg-black text-white text-xl lg:text-sm py-4 px-4 lg:py-2 lg:px-4 mt-9 lg:py-3 lg:px-5 font-bold rounded-lg mt-4 ${
        !timeSelected ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={handleConfirm}
      disabled={!timeSelected}
    >
      Finaliser la réservation
    </button>
    <div className="mt-4 text-center text-xl lg:text-sm font-semibold">
      <button className="text-black" onClick={onReturnToAccount}>
        Retour à l'accueil
      </button>
    </div>
  </>
)}


      {step === 'confirm' && (
        <>
          <h2 className="text-2xl lg:text-xl font-bold mb-6 lg:mb-4 mt-10 lg:mt-0">Finaliser la réservation</h2>
          <div className="mb-4">
            <p className="font-semibold text-xl lg:text-base">Nom de réservation</p>
            <p className='text-xl lg:text-lg'>{user?.firstname} {user?.lastname}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-xl lg:text-base">Date et heure sélectionnées</p>
            <p className='text-xl lg:text-lg'>{localDate.toLocaleDateString()} à {timeSelected}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-xl lg:text-base">Nombre de couverts:</p>
            <div className="flex items-center justify-center my-4 gap-2">
              <button 
                onClick={decrementNbrPersons} 
                className="bg-black text-xl font-bold text-white px-4 py-2 lg:py-1 lg:px-4 rounded-lg"
              >
                -
              </button>
              <span className='text-2xl px-8 lg:text-lg font-bold px-2'>{nbrPersons}</span>
              <button 
                onClick={incrementNbrPersons} 
                className="bg-green-800 text-xl font-bold text-white px-4 py-2 lg:py-1 lg:px-4 rounded-lg"
              >
                +
              </button>
            </div>
          </div>
          <div className="my-7">
            <p className="font-semibold text-xl lg:text-base">Infos complémentaires:</p>
            <textarea
              className="mt-4 w-full text-lg h-[100px] p-2 lg:p-2 border border-gray-300 rounded-lg"
              rows={4}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)} 
              placeholder="Un anniversaire à fêter ? Une suggestion ? Faites-le nous savoir ici..."
            />
          </div>
          <div className="flex flex-col gap-4 justify-center">
            <button
              className="bg-black text-white text-lg lg:text-sm font-semibold py-4 px-5 lg:py-2 lg:px-4 rounded-lg"
              onClick={() => setStep('selectDate')}
            >
              Modifier la réservation
            </button>
            <button
              className="bg-green-800 text-white text-base text-lg lg:text-sm font-semibold py-4 px-5 lg:py-2 lg:px-4 rounded-lg"
              onClick={handleFinalConfirmation}
            >
              Confirmer la réservation
            </button>
          </div>
          {errorMessage && <p className="text-red-600 font-semibold mt-4">{errorMessage}</p>}
          <div className="mt-4 text-center">
            <button className="text-black text-xl lg:text-sm mt-2 lg:mt-0 font-semibold" onClick={onReturnToAccount}>
              Retour à l'accueil
            </button>
          </div>
        </>
      )}

{step === 'success' && reservationDetails && (
  <>
    <h2 className="text-3xl lg:text-lg font-bold mb-4">Réservation effectuée</h2>
    <p className="mb-4 text-xl lg:text-sm font-semibold lg:font-normal">Vous recevrez un mail de confirmation dès que le restaurant aura confirmé la réservation.</p>
    <div className="text-left">
      <ul className='my-10 lg:my-5 pl-2 text-xl lg:text-sm'>
        <li className="font-semibold mb-2">Nom de réservation :
          <span className='font-normal'> {user?.lastname}</span>
        </li>
        <li className="font-semibold mb-2">Email :
          <span className='font-normal'> {user?.email}</span>
        </li>
        <li className="font-semibold mb-2">N° de téléphone :
          <span className='font-normal'> {user?.phone_number}</span>
        </li>
        <li className="font-semibold mb-2">Date de réservation :
          <span className='font-normal'> {localDate.toLocaleDateString()}</span>
        </li>
        <li className="font-semibold mb-2">Heure de réservation :
          <span className='font-normal'> {timeSelected}</span>
        </li>
        <li className="font-semibold mb-2">Nombre de personnes :
          <span className='font-normal'> {nbrPersons}</span>
        </li>
        {additionalInfo && (
          <li className="font-semibold mb-2 flex flex-col">Autres informations :
            <span className='font-normal'> {additionalInfo}</span>
          </li>
        )}
      </ul>
    </div>
    <div className="my-4 text-center ">   
      <button className="bg-black mt-2 p-4 lg:p-2 text-white text-xl lg:text-sm font-semibold rounded-lg w-full" onClick={onReturnToAccount}>
        Retour à l'accueil
      </button>
    </div>
  </>
)}
    </div>
  );
};