import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../Context/TokenProvider';
import UserBreadCrumb from '../Components/Modal/BreadCrumb';

const ShowAllBusiness = () => {
  const [businesses, setBusinesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { token } = useContext(TokenContext);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/businessDetails/viewAll', {
          headers: { Authorization: token },
        });
        setBusinesses(response.data.data);
      } catch (error) {
        console.error('Error fetching business data:', error);
      }
    };

    fetchBusinessData();
  }, [token]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBusinesses = businesses.filter(
    (business) =>
      (business.ownerName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (business.businessName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (business.category?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (business.whatsappContact?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (business.address?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className='pt-[6rem] px-5 h-screen overflow-auto'>
      <UserBreadCrumb />
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={handleSearchChange}
        className='w-full p-2 mt-2 mb-4 border border-gray-300 rounded'
      />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredBusinesses.map((business) => (
          <div key={business._id} className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
            {business.ownerPhoto && <img src={business.ownerPhoto} alt={business.ownerName} className='w-full h-48 object-cover rounded-t-lg' />}
            <h2 className='text-xl font-semibold mt-4'>{business.businessName}</h2>
            <p><strong>Owner Name:</strong> {business.ownerName}</p>
            <p><strong>Category:</strong> {business.category}</p>
            <p><strong>WhatsApp Contact:</strong> {business.whatsappContact}</p>
            <p><strong>Address:</strong> {business.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowAllBusiness;
