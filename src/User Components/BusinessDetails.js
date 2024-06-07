import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserBreadCrumb from "../Components/Modal/BreadCrumb";
import './BusinessDetails.css';
import { IoSearch } from "react-icons/io5";
import { TokenContext } from "../Context/TokenProvider";

const BusinessDetails = () => {
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
    };

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setFormData({
            ...formData,
            [id]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            if (edit) {
                const response = await axios.put(
                    `http://localhost:8000/api/businessDetails/member/${editId}/update`,
                    data,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                const updatedBusinessList = businessList.map((item) =>
                    item._id === editId ? response.data.data : item
                );
                setBusinessList(updatedBusinessList);
                setEdit(false);
                setEditId(null);
            } else {
                const response = await axios.post(
                    'http://localhost:8000/api/businessDetails/member/add',
                    data,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                setBusinessList([...businessList, response.data.data]);
            }
            closeModal();
        } catch (error) {
            console.error('Error adding/updating business:', error);
        }
    };

    const fetchBusinessList = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/businessDetails/member/list', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (Array.isArray(response.data)) {
                setBusinessList(response.data);
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

    const handleUpdate = (id) => {
        const businessToEdit = businessList.find((i) => i._id === id);
        setFormData({
            ownerName: businessToEdit.ownerName,
            ownerPhoto: null, // Reset photo input for edit
            businessName: businessToEdit.businessName,
            category: businessToEdit.category,
            whatsappContact: businessToEdit.whatsappContact,
            address: businessToEdit.address
        });
        setEditId(id);
        setEdit(true);
        openModal();
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/businessDetails/member/${id}/delete`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const updatedBusinessList = businessList.filter((item) => item._id !== id);
            setBusinessList(updatedBusinessList);
        } catch (error) {
            console.error("Error deleting business:", error);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = businessList.filter((item) =>
        item.businessName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='pt-[6rem] px-5 h-screen overflow-auto'>
            <UserBreadCrumb />
            <button
                className='modal-button flex mt-2 ml-auto'
                onClick={openModal}
            >
                Add Business
            </button>
            {isModalOpen && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <h2 className='text-xl mb-4'>{edit ? "Edit Business" : "Add Business"}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='ownerName'>
                                    Owner Name
                                </label>
                                <input
                                    type='text'
                                    id='ownerName'
                                    value={formData.ownerName}
                                    className='w-full px-3 py-2 border-2 border-black rounded'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='ownerPhoto'>
                                    Owner Photo
                                </label>
                                <input
                                    type='file'
                                    id='ownerPhoto'
                                    className='w-full px-3 py-2 border-2 border-black rounded'
                                    onChange={handleChange}
                                    required={!edit} // Required only when adding a new business
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='businessName'>
                                    Business Name
                                </label>
                                <input
                                    type='text'
                                    id='businessName'
                                    value={formData.businessName}
                                    className='w-full px-3 py-2 border-2 border-black rounded'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='category'>
                                    Category
                                </label>
                                <input
                                    type='text'
                                    id='category'
                                    value={formData.category}
                                    pattern='[a-zA-Z0-9\s]+'
                                    className='w-full px-3 py-2 border-2 border-black rounded'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='whatsappContact'>
                                    Whatsapp Number
                                </label>
                                <input
                                    type='tel'
                                    id='whatsappContact'
                                    value={formData.whatsappContact}
                                    className='w-full px-3 py-2 border-2 border-black rounded'
                                    onChange={handleChange}
                                    required
                                    maxLength={10}
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='address'>
                                    Address
                                </label>
                                <input
                                    type='text'
                                    id='address'
                                    value={formData.address}
                                    className='w-full px-3 py-2 border-2 border-black rounded'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    type='button'
                                    className='modal-button-cancel mx-2'
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='modal-button mx-2'
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className='mt-6'>
                <h2 className='text-2xl mb-4'>Business List</h2>
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
                <div className='mt-6'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredData.map((business, index) => (
                        <div key={business._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col">
                            <img src={`http://localhost:8000/${business.ownerPhoto}`} alt='Owner' className='h-40 w-full object-cover rounded-t-lg' />
                            <div className="flex-grow flex flex-col justify-between">
                                <div>
                                    <p><span className="font-bold">Owner Name:</span> {business.ownerName}</p>
                                    <p><span className="font-bold">Business Name:</span> {business.businessName}</p>
                                    <p><span className="font-bold">Category:</span> {business.category}</p>
                                    <p><span className="font-bold">Whatsapp Number:</span> {business.whatsappContact}</p>
                                    <p><span className="font-bold">Address:</span> {business.address}</p>
                                </div>
                                <div className="mt-4">
                                    <button onClick={() => handleUpdate(business._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(business._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
};

export default BusinessDetails;
