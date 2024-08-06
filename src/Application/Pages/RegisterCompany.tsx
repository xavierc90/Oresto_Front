import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../../Infrastructure/Http/axios.instance';
import { useAuth } from '../../Module/Auth/auth.hook';

export const RegisterCompany = () => {
  useEffect(() => {
    document.title = 'Oresto - Créer une entreprise';
  }, []);

  const { userId } = useAuth();
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    companyPostalCode: '',
    companyCity: '',
    companyCountry: ''
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const navigate = useNavigate();

  const handleCompanyCreation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const companyData = {
      name: formData.companyName,
      address: formData.companyAddress,
      postal_code: formData.companyPostalCode,
      city: formData.companyCity,
      country: formData.companyCountry,
      user_id: userId
    };

    console.log('Token:', localStorage.getItem('token'));
    console.log('User ID:', userId);

    try {
      const response = await http.post('/add_company', companyData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 201) {
        const companyId = response.data._id; // Assurez-vous que l'ID de la société est bien renvoyé dans la réponse
        localStorage.setItem('companyId', companyId); // Stocker l'ID de la société
        console.log('Company ID:', companyId); // Afficher l'ID de la société dans la console
        alert('Entreprise créée avec succès !');
        navigate('/dashboard/bookings'); // Rediriger l'utilisateur vers dashboard/bookings
      } else {
        setErrorMessage('Une erreur est survenue lors de la création de l\'entreprise.');
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la création de l\'entreprise.');
    }
  };

  return (
    <div className='w-full h-screen flex'>
      <div className='cover-company w-6/12'></div>
      <div className='w-6/12 bg-light'>
        <div className="flex flex-col items-center justify-center h-screen">
          <a href="/login">
            <img src="../../../public/img/logo-oresto-red.png" width="300px" alt="Logo Oresto" />
          </a>
          <form method="POST" className="flex flex-col mt-10" onSubmit={handleCompanyCreation}>
            <div className='flex flex-col w-[390px] justify-center items-center'>
              <h2 className='text-center mb-10'>Renseignez les informations de votre restaurant pour accéder à votre espace restaurateur et gérer vos réservations.</h2>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <label className="text-lg font-bold mb-2 text-sm">Nom du restaurant :</label>
                <input
                  type="text"
                  placeholder="Exemple : La belle assiette"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange(e, 'companyName')}
                  className={`border-2 w-[300px] p-2 mb-6 text-sm font-bold ${formData.companyName.trim() !== '' ? 'border-green-500' : 'border-gray-300'}`}
                />
              </div>
            </div>
            <label className="text-lg font-bold mb-2 text-sm">Adresse :</label>
            <input
              type="text"
              placeholder="Adresse"
              value={formData.companyAddress}
              onChange={(e) => handleInputChange(e, 'companyAddress')}
              className={`border-2 p-2 mb-6 text-sm w-[360px] font-bold ${formData.companyAddress.trim() !== '' ? 'border-green-500' : 'border-gray-300'}`}
            />
            <div className='flex items-center justify-left gap-4'>
              <div className='flex flex-col'>
                <label className="text-lg font-bold mb-2 text-sm">Code postal :</label>
                <input
                  type="text"
                  placeholder="Code postal"
                  value={formData.companyPostalCode}
                  onChange={(e) => handleInputChange(e, 'companyPostalCode')}
                  className={`border-2 p-2 mb-6 w-[120px] text-sm font-bold ${formData.companyPostalCode.trim() !== '' ? 'border-green-500' : 'border-gray-300'}`}
                />
              </div>
              <div className='flex flex-col'>
                <label className="text-lg font-bold mb-2 text-sm">Ville :</label>
                <input
                  type="text"
                  placeholder="Ville"
                  value={formData.companyCity}
                  onChange={(e) => handleInputChange(e, 'companyCity')}
                  className={`border-2 p-2 mb-6 text-sm font-bold ${formData.companyCity.trim() !== '' ? 'border-green-500' : 'border-gray-300'}`}
                />
              </div>
            </div>
            <label className="text-lg font-bold mb-2 text-sm">Pays :</label>
            <input
              type="text"
              placeholder="Pays"
              value={formData.companyCountry}
              onChange={(e) => handleInputChange(e, 'companyCountry')}
              className={`border-2 p-2 mb-6 text- w-[200px] sm font-bold ${formData.companyCountry.trim() !== '' ? 'border-green-500' : 'border-gray-300'}`}
            />
            <div className="flex flex-col items-center justify-center">
              {errorMessage && (
                <div className="text-red-500 text-center">
                  {errorMessage}
                </div>
              )}
              <button
                type="submit"
                className={`bg-black text-white py-4 rounded-lg w-2/3 mt-5 font-bold uppercase ${
                  formData.companyName.trim() !== '' &&
                  formData.companyAddress.trim() !== '' &&
                  formData.companyPostalCode.trim() !== '' &&
                  formData.companyCity.trim() !== '' &&
                  formData.companyCountry.trim() !== ''
                    ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                }`}
                disabled={
                  !(
                    formData.companyName.trim() !== '' &&
                    formData.companyAddress.trim() !== '' &&
                    formData.companyPostalCode.trim() !== '' &&
                    formData.companyCity.trim() !== '' &&
                    formData.companyCountry.trim() !== ''
                  )
                }
              >
                Valider l'inscription
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
