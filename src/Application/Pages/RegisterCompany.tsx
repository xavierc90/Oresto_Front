import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { http } from '../../Infrastructure/Http/axios.instance';
import { useAuth } from '../../Module/Auth/auth.hook';

export const RegisterCompany = () => {
  useEffect(() => {
    document.title = 'Oresto - Créer une entreprise';
  }, []);

  const { userId } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    companyPostalCode: '',
    companyCity: '',
    companyCountry: '',
    companyPhoneNumber: '',
    companyEmail: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleCompanyCreation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const companyData = {
      name: formData.companyName,
      address: formData.companyAddress,
      postal_code: formData.companyPostalCode,
      city: formData.companyCity,
      country: formData.companyCountry,
      phone_number: formData.companyPhoneNumber,
      email: formData.companyEmail,
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
        alert('Entreprise créée avec succès !');
        navigate('/dashboard');
      } else {
        setErrorMessage('Une erreur est survenue lors de la création de l\'entreprise.');
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la création de l\'entreprise.');
    }
  };

  return (
    <div className='w-full h-screen flex'>
      <div className='w-6/12 bg-light'>
        <div className="flex flex-col items-center justify-center h-screen">
          <a href="/login">
            <img src="../../../public/img/logo-oresto-red.png" width="300px" alt="Logo Oresto" />
          </a>
          <form method="POST" className="flex flex-col mt-10" onSubmit={handleCompanyCreation}>
          <h1 className='text-2xl font-bold mb-10'>Enregistrez votre restaurant</h1>
          <div className="flex gap-4">
              <div className="flex flex-col">
                <label className="text-lg font-bold mb-2">Nom du restaurant :</label>
                <input
                  type="text"
                  placeholder="Exemple : La belle assiette"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange(e, 'companyName')}
                  className={`border-2 w-auto p-2 mb-6 font-bold ${formData.companyName.trim() !== '' ? 'border-green-500' : 'border-gray-300'}`}
                />
              </div>
            </div>
            <label className="text-lg font-bold mb-2">Adresse :</label>
            <input
              type="text"
              placeholder="Adresse"
              value={formData.companyAddress}
              onChange={(e) => handleInputChange(e, 'companyAddress')}
              className={`border-2 p-2 mb-6 font-bold ${formData.companyAddress.trim() !== '' ? 'border-green-500' : 'border-gray-300'}`}
            />
            <div className='flex items-center justify-center gap-4'>
                <div className='flex flex-col'>
            <label className="text-lg font-bold mb-2">Code postal :</label>
            <input
              type="text"
              placeholder="Code postal"
              value={formData.companyPostalCode}
              onChange={(e) => handleInputChange(e, 'companyPostalCode')}
              className={`border-2 p-2 mb-6 font-bold ${formData.companyPostalCode.trim() !== '' ? 'border-green-500' : 'border-gray-300'}`}
            />
                </div>
            <div className='flex flex-col'>
            <label className="text-lg font-bold mb-2">Ville :</label>
            <input
              type="text"
              placeholder="Ville"
              value={formData.companyCity}
              onChange={(e) => handleInputChange(e, 'companyCity')}
              className={`border-2 p-2 mb-6 font-bold ${formData.companyCity.trim() !== '' ? 'border-green-500' : 'border-gray-300'}`}
            />
                </div>
            </div>
            <label className="text-lg font-bold mb-2">Pays :</label>
            <input
              type="text"
              placeholder="Pays"
              value={formData.companyCountry}
              onChange={(e) => handleInputChange(e, 'companyCountry')}
              className={`border-2 p-2 mb-6 font-bold ${formData.companyCountry.trim() !== '' ? 'border-green-500' : 'border-gray-300'}`}
            />

            <label className="text-lg font-bold mb-2">Numéro de téléphone :</label>
            <input
              type="text"
              placeholder="Numéro de téléphone"
              value={formData.companyPhoneNumber}
              onChange={(e) => handleInputChange(e, 'companyPhoneNumber')}
              className={`border-2 p-2 mb-6 font-bold ${formData.companyPhoneNumber.trim() !== '' ? 'border-green-500' : 'border-gray-300'}`}
            />

            <label className="text-lg font-bold mb-2">Email :</label>
            <input
              type="email"
              placeholder="Email"
              value={formData.companyEmail}
              onChange={(e) => handleInputChange(e, 'companyEmail')}
              className={`border-2 p-2 mb-6 font-bold ${formData.companyEmail.trim() !== '' ? 'border-green-500' : 'border-gray-300'}`}
            />

            <div className="flex flex-col items-center justify-center">
              {errorMessage && (
                <div className="text-red-500 text-center mb-4">
                  {errorMessage}
                </div>
              )}
              <button
                type="submit"
                className={`bg-black text-white py-4 rounded-lg w-2/3 font-bold uppercase ${
                  formData.companyName.trim() !== '' &&
                  formData.companyAddress.trim() !== '' &&
                  formData.companyPostalCode.trim() !== '' &&
                  formData.companyCity.trim() !== '' &&
                  formData.companyCountry.trim() !== '' &&
                  formData.companyPhoneNumber.trim() !== '' &&
                  formData.companyEmail.trim() !== '' 
                  ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                }`}
                disabled={
                  !(
                    formData.companyName.trim() !== '' &&
                    formData.companyAddress.trim() !== '' &&
                    formData.companyPostalCode.trim() !== '' &&
                    formData.companyCity.trim() !== '' &&
                    formData.companyCountry.trim() !== '' &&
                    formData.companyPhoneNumber.trim() !== '' &&
                    formData.companyEmail.trim() !== ''
                  )
                }
              >
                Créer l'entreprise
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='cover-login w-6/12'>
      </div>
    </div>
  );
};
