import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserBreadCrumb from "../Components/Modal/BreadCrumb";
import './Business.css';
import { IoSearch } from "react-icons/io5";
import { TokenContext } from "../Context/TokenProvider";

const Business = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerPhoto: null,
    businessName: '',
    category: '',
    whatsappContact: '',
    address: ''
  });
  const [businessList, setBusinessList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const { token } = useContext(TokenContext);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      ownerName: '',
      ownerPhoto: null,
      businessName: '',
      category: '',
      whatsappContact: '',
      address: ''
    });
    setEdit(false);
    setEditId(null);
  };

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData({
      ...formData,
      [id]: files ? files[0] : value
    });
  };


  const fetchBusinessList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/businessDetails/viewAll', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (Array.isArray(response.data.data)) {
        setBusinessList(response.data.data);
      } else {
        console.error('Error fetching business list: response data is not an array');
      }
    } catch (error) {
      console.error('Error fetching business list:', error);
    }
  };

  useEffect(() => {
    fetchBusinessList();
  }, []);


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = businessList.filter((item) =>
    item.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='pt-[6rem] px-5 h-screen overflow-auto'>
      <UserBreadCrumb />
      <div className='mt-6'>
        <div className='flex justify-between items-center my-2'>
          <h2 className='text-2xl'>Business List</h2>
          <div className="flex items-center justify-between mt-5">
            <div className="w-fit relative">
              <input
                className="w-[20rem] p-2 text-black search_input"
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search Business"
              />
              <IoSearch className="absolute text-xl top-[1.1rem] right-[1.2rem]" />
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">No.</th>
                  <th className="py-3 px-4 text-left">Owner Name</th>
                  <th className="py-3 px-4 text-left">Business</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Whatsapp No.</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((i, index) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{i.ownerName}</td>
                    <td className="py-3 px-4">{i.businessName}</td>
                    <td className="py-3 px-4">{i.category}</td>
                    <td className="py-3 px-4">{i.whatsappContact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className='mt-6'>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-5">
            {filteredData.map((business) => (
              <div key={business._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src={`http://localhost:8000/${business.ownerPhoto}`} alt='Owner' className='h-56 w-full object-cover p-4' />
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <p className="text-gray-800 flex justify-between"><span className="font-bold">Owner Name:</span> {business.ownerName}</p>
                    <p className="text-gray-800 flex justify-between"><span className="font-bold">Business Name:</span> {business.businessName}</p>
                    <p className="text-gray-800 flex justify-between"><span className="font-bold">Category:</span> {business.category}</p>
                    <p className="text-gray-800 flex justify-between"><span className="font-bold">Whatsapp Number:</span> {business.whatsappContact}</p>
                    <p className="text-gray-800 flex justify-between"><span className="font-bold">Address:</span><span className='inline-flex ml-auto'>{business.address}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Business;
