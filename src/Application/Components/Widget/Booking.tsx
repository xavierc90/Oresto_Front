import React, { useState, useEffect } from 'react';
import { CalendarShadcn } from '../Dashboard/CalendarShadcn';
import { useAuth } from '../../../Module/Auth/useAuth'; 
import { AiOutlineCalendar } from 'react-icons/ai';

type BookingProps = {
  selectedDate: Date | null;
  onTimeSelected: () => void;
  onReturnToAccount: () => void;
};

export const Booking: React.FC<BookingProps> = ({ selectedDate, onTimeSelected, onReturnToAccount }) => {
  const { user } = useAuth();
  const [step, setStep] = useState<'selectDate' | 'selectTime' | 'confirm'>('selectDate');
  const [timeSelected, setTimeSelected] = useState<string | null>(null);
  const [localDate, setLocalDate] = useState<Date>(selectedDate ?? new Date());  // Utilisation d'une date par défaut si selectedDate est null ou undefined
  const [nbrPersons, setNbrPersons] = useState(1);
  const [additionalInfo, setAdditionalInfo] = useState<string>(''); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedDate) {
      setLocalDate(new Date());
    }
  }, [selectedDate]);

  const validateDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date.getTime() >= today.getTime();
  };

  const handleDateSelect = (date: Date) => {
    setLocalDate(date);
    if (validateDate(date)) {
      setErrorMessage(null);  // Date valide, pas de message d'erreur
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

  const handleFinalConfirmation = () => {
    onTimeSelected();
    console.log("Réservation confirmée pour", localDate, "à", timeSelected, "pour", nbrPersons, "personne(s).", "Infos complémentaires:", additionalInfo);
  };

  const incrementNbrPersons = () => setNbrPersons(prev => prev + 1);
  const decrementNbrPersons = () => setNbrPersons(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div>
      {step === 'selectDate' && (
        <>
          <h2 className="text-xl font-bold pb-9">Choisissez la date</h2>
          <CalendarShadcn 
            mode="single" 
            selected={localDate}  // Assurez-vous que selected est toujours de type Date
            onSelect={handleDateSelect} 
            required={true}
          />
                {errorMessage && (
            <p className="text-red-600 font-semibold">{errorMessage}</p>
          )}
          <button
            className={`bg-black text-white text-sm font-semibold py-2 px-4 rounded-lg mt-8 w-full ${
              !validateDate(localDate) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleDateConfirm}
            disabled={!validateDate(localDate)}
          >
            Sélectionner l'heure
          </button>
          <div className="mt-4 text-center">
            <button className="text-black underline" onClick={onReturnToAccount}>
              Retour à l'accueil
            </button>
          </div>
        </>
      )}
      
      {step === 'selectTime' && (
        <>
          <h2 className="text-xl font-bold mb-4">Choisissez l'heure</h2>
          <div className="flex items-center justify-center text-lg text-green-800 mb-4">
            <AiOutlineCalendar 
              className="mr-2 cursor-pointer" onClick={() => setStep('selectDate')}
            />
            <span>
              {localDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h3 className="font-bold text-md mb-2">Repas du midi</h3>
          <div className="grid grid-cols-4 lg:grid-cols-4 gap-2 mb-4 font-semibold">
            {['12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45'].map(time => (
              <button
                key={time}
                className={`flex justify-center items-center py-2 px-4 text-center rounded-lg text-sm lg:text-base lg:py-3 lg:px-5 ${timeSelected === time ? 'bg-green-800 text-white' : 'bg-gray-300 text-black'}`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
          <h3 className="font-bold text-md mb-2 mt-6">Repas du soir</h3>
          <div className="grid grid-cols-4 lg:grid-cols-4 gap-2 font-semibold">
            {['20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45'].map(time => (
              <button
                key={time}
                className={`flex justify-center items-center py-2 px-4 text-center rounded-lg text-sm lg:text-base lg:py-3 lg:px-5 ${timeSelected === time ? 'bg-green-800 text-white' : 'bg-gray-300 text-black'}`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
          <button
            className={`bg-black text-white text-sm py-2 px-4 mt-9 lg:py-3 lg:px-5 font-bold rounded-lg mt-4 ${
              !timeSelected ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleConfirm}
            disabled={!timeSelected}
          >
            Finaliser la réservation
          </button>
          <div className="mt-4 text-center">
            <button className="text-black underline" onClick={onReturnToAccount}>
              Retour à l'accueil
            </button>
          </div>
        </>
      )}

      {step === 'confirm' && (
        <>
          <h2 className="text-xl font-bold mb-4">Finaliser la réservation</h2>
          <div className="mb-4">
            <p className="font-bold">Nom de réservation:</p>
            <p>{user?.firstname} {user?.lastname}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Date et heure sélectionnées:</p>
            <p>{localDate.toLocaleDateString()} à {timeSelected}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Nombre de couverts:</p>
            <div className="flex items-center justify-center my-4 gap-2">
              <button 
                onClick={decrementNbrPersons} 
                className="bg-black text-lg font-bold text-white py-1 px-4 rounded-lg"
              >
                -
              </button>
              <span className='text-lg font-bold px-2'>{nbrPersons}</span>
              <button 
                onClick={incrementNbrPersons} 
                className="bg-green-800 text-lg font-bold text-white py-1 px-4 rounded-lg"
              >
                +
              </button>
            </div>
          </div>
          <div className="my-7">
            <p className="font-bold">Infos complémentaires:</p>
            <textarea
              className="mt-4 w-full p-2 border border-gray-300 rounded-lg"
              rows={4}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)} 
              placeholder="Un anniversaire à fêter ? Une suggestion ? Faites-le nous savoir ici..."
            />
          </div>
          <div className="flex gap-4 justify-center">
            <button
              className="bg-black text-white text-sm font-semibold py-2 px-4 rounded-lg"
              onClick={() => setStep('selectDate')}
            >
              Modifier
            </button>
            <button
              className="bg-green-800 text-white text-sm font-semibold py-2 px-4 rounded-lg"
              onClick={handleFinalConfirmation}
            >
              Confirmer
            </button>
          </div>
          <div className="mt-4 text-center">
            <button className="text-black underline" onClick={onReturnToAccount}>
              Retour à l'accueil
            </button>
          </div>
        </>
      )}
    </div>
  );
};
