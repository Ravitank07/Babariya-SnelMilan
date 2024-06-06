  import React, { useState, useEffect } from 'react';
  import { IoMdClose } from "react-icons/io";
  import { IoSearch } from "react-icons/io5";
  import { AiFillDelete } from "react-icons/ai";
  import { HiMiniUserPlus } from "react-icons/hi2";
  import { FaUsersViewfinder } from "react-icons/fa6";
  import { GrDocumentUpdate } from "react-icons/gr";
  import Modal from "./Modal/Modal";
  import axios from 'axios';
  import logo from '../Images/Ravi.jpg'
  import './Members.css';
  import BreadCrumb from './Modal/BreadCrumb';

  const Members = () => {
    const [mainMembers, setMainMembers] = useState([]);
    const [data, setData] = useState([]);
    const [imageUrl,setImageUrl] = useState('');
    const [inputValue, setInputValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
      name: '',
      mobile: '',
      gender: '',
      address: '',
      birthDate: '',
      maritalStatus: '',
      photo: '',
      village: '',
      taluka: '',
      district: '',
      education: '',
      bloodGroup: ''
    });
    const [viewMemberData, setViewMemberData] = useState({});
    const [errors, setErrors] = useState({});
    const [districtData, setDistrictData] = useState([]);
    const [talukaData, setTalukaData] = useState([]);
    const [villageData, setVillageData] = useState([]);
    const [bloodGroup, setBloodGroup] = useState([]);
    const [education, setEducation] = useState([]);
    useEffect(() => {
      fetchMemberData();
      fetchDistrictData();
      fetchTalukaData();
      fetchVillageData();
      fetchbloodGroupData();
      fetchEducationData();
    }, []);

    const Authorization = process.env.REACT_APP_AUTHORIZATION_TOKEN;

    const fetchMemberData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/member/list", {
          headers: { Authorization: `${Authorization}` }
        });
        const ImageData = await response.data;
        const data = await response.data;
        setImageUrl(ImageData.photo);
        setData(response.data.data);
        setMainMembers(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const openModal = () => {
      setFormData({
        name: '',
        mobile: '',
        gender: '',
        address: '',
        birthDate: '',
        maritalStatus: '',
        photo: '',
        village: '',
        taluka: '',
        district: '',
        education: '',
        bloodGroup: ''
      });
      setIsModalOpen(true);
      setEdit(false);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const openViewModal = (member) => {
      setViewMemberData(member);
      setViewModalOpen(true);
    };

    const closeViewModal = () => {
      setViewModalOpen(false);
    };

    const fetchDistrictData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/district/viewAll", {
          headers: { Authorization: `${Authorization}` }
        });
        setDistrictData(response.data.data);
      } catch (error) {
        console.log("District Fetching Data", error);
      }
    };

    const fetchTalukaData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/taluka/viewAll", {
          headers: { Authorization: `${Authorization}` }
        });
        setTalukaData(response.data.data);
      } catch (error) {
        console.log("Fetching Taluka Data", error);
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const fetchVillageData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/village/viewAll", {
          headers: { Authorization: `${Authorization}` }
        });
        setVillageData(response.data.data);
      } catch (error) {
        console.log("Fetching Village Data", error);
      }
    };

    const fetchbloodGroupData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/bloodgroup/viewAll", {
          headers: { Authorization: `${Authorization}` }
        });
        setBloodGroup(response.data.data);
      } catch (error) {
        console.log("Fetching BloodGroup Data", error);
      }
    };

    const fetchEducationData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/education/viewAll", {
          headers: { Authorization: `${Authorization}` }
        });
        setEducation(response.data.data);
      } catch (error) {
        console.log("Fetching Education Data", error);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      try {
        const response = await axios.post("http://localhost:8000/api/member/add", formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: Authorization
          }
        });
        setMainMembers([...mainMembers, response.data.data]);
        setData([...data, response.data.data]);
        setFormData({
          name: '',
          mobile: '',
          gender: '',
          address: '',
          birthDate: '',
          maritalStatus: '',
          photo: '',
          village: '',
          taluka: '',
          district: '',
          education: '',
          bloodGroup: ''
        });
        setInputValue('');
        closeModal();
      } catch (error) {
        console.log("Error adding Main Members", error);
      }
    };

    const handleUpdate = async (e) => {
      e.preventDefault();
      if (Object.keys(errors).length === 0) {
        try {
          const response = await axios.put(
            `http://localhost:8000/api/member/update/${editId}`,
            formData,
            {
              headers: {
                Authorization: Authorization,
              },
            }
          );
          const updatedData = mainMembers.map((item) =>
            item._id === editId ? response.data.data : item
          );
          setMainMembers(updatedData);
          closeModal();
        } catch (error) {
          console.error("Error updating committee member:", error);
        }
      } else {
        setErrors(errors);
      }
    };

    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:8000/api/member/delete/${id}`, {
          headers: { Authorization: `${Authorization}` }
        });
        const updatedData = data.filter((member) => member._id !== id);
        setData(updatedData);
        setMainMembers(updatedData);
      } catch (error) {
        console.log("Deleting Member Data", error);
      }
    };

    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };

    const filteredData = mainMembers?.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleEdit = (id) => {
      const selectedMember = mainMembers.find((item) => item._id === id);
      setFormData({
        name: selectedMember.name,
        mobile: selectedMember.mobile,
        gender: selectedMember.gender,
        address: selectedMember.address,
        birthDate: selectedMember.birthDate,
        maritalStatus: selectedMember.maritalStatus,
        photo: selectedMember.photo,
        village: selectedMember.village,
        taluka: selectedMember.taluka,
        education: selectedMember.education,
        district: selectedMember.district,
        bloodGroup: selectedMember.bloodGroup
      });
      setIsModalOpen(true);
      setEdit(true);
      setEditId(id);
    };

    return (
      <>
        <div className='pt-[6rem] px-5 h-screen overflow-auto'>
          <BreadCrumb />
          <div className='flex justify-between items-center'>
            <div className="w-fit relative mt-3">
              <input
                className="w-[20rem] p-2 text-black search_input"
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search Member"
              />
              <IoSearch className="absolute text-xl top-[1.1rem] right-[1.2rem]" />
            </div>
            <div onClick={openModal} className='mr-[2rem] bg-black text-white w-[14rem] flex justify-center items-center px-7 h= [2.1rem] btn-submit rounded-lg'>
              <HiMiniUserPlus className='text-[14px] mr-3 text-white' />
              <button>
                <p className='text-white font-semibold py-3'>Add Member</p>
              </button>
            </div>
          </div>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="modal-header">
              <h1 className='text-[23px]'>Add a New Member</h1>
              <button onClick={closeModal}><IoMdClose className='text-3xl' /></button>
            </div>
            <form className="form-grid" onSubmit={edit ? handleUpdate : handleSubmit}>
              <div className="form-column">
                <label>
                  Name
                  <input type="text" name="name" className='input-fields' autoComplete={'off'} placeholder='Enter Member name' required value={formData.name} onChange={handleChange} />
                  {errors.name && <span className="error text-red-600">{errors.name}</span>}
                </label>
                <hr className="my-1" />
                {edit ? ("") : (<label>
                  Mobile Number
                  <input
                    type="tel"
                    name="mobile"
                    maxLength={10}
                    autoComplete={'off'}
                    className='input-fields'
                    placeholder='Enter Member Mobile Number'
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    onKeyPress={(e) => {
                      const validation = /^[0-9\b]+$/;
                      if (!validation.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {errors.mobile && <span className="error text-red-600">{errors.mobile}</span>}
                </label>)}
                <hr className="my-1" />
                <label className="flex flex-col items-start my-1">
                  <span>Gender:</span>
                  <div className="flex items-center">
                    <label className="flex items-center mr-4">
                      <input
                        type="radio"
                        name="gender"
                        className="custom-radio"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleChange}
                      />
                      <span className="custom-radio-label ml-2">Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        className="custom-radio"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleChange}
                      />
                      <span className="custom-radio-label ml-2">Female</span>
                    </label>
                  </div>
                  {errors.gender && <span className="error text-red-600">{errors.gender}</span>}
                </label>
                <hr className="my-1" />
                <label>
                  Residence Address
                  <input type="text" name="address" autoComplete={'off'} className='input-fields' placeholder='Enter Member Residence Address' value={formData.address} onChange={handleChange} />
                  {errors
                    .address && <span className="error text-red-600">{errors.address}</span>}
                </label>
                <hr className="my-1" />
                <label>
                  Birth Date
                  <input type="date" name="birthDate" className='input-fields' value={formData.birthDate} required onChange={handleChange} />
                  {errors.birthDate && <span className="error text-red-600">{errors.birthDate}</span>}
                </label>
                <hr className="my-1" />
                <label className="flex flex-col items-start">
                  <span>Marital status:</span>
                  <div className="flex items-center mt-2">
                    <label className="flex items-center mr-4">
                      <input
                        type="radio"
                        name="maritalStatus"
                        className="custom-radio"
                        value="married"
                        checked={formData.maritalStatus === 'married'}
                        onChange={handleChange}
                      />
                      <span className="custom-radio-label ml-2">Married</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="maritalStatus"
                        className="custom-radio"
                        value="unmarried"
                        checked={formData.maritalStatus === 'unmarried'}
                        onChange={handleChange}
                      />
                      <span className="custom-radio-label ml-2">Unmarried</span>
                    </label>
                  </div>
                  {errors.maritalStatus && <span className="error mt-2 text-red-600">{errors.maritalStatus}</span>}
                </label>
                <hr className="my-1" />
              </div>
              <div className="form-column">
                <label>
                  Upload Member's Image
                  <input type="file" name="photo" className='input-fields' required accept='image/*' />
                  {errors.photo && <span className="error text-red-600">{errors.photo}</span>}
                </label>
                <hr className="my-1" />
                <label>
                  Village Name
                  <select name="village" className='input-fields' value={formData.village} required onChange={handleChange}>
                    <option value="">Select Village</option>
                    {villageData.map((option) => (
                      <option key={option._id} value={option.name}>{option.name}</option>
                    ))}
                  </select>
                  {errors.village && <span className="error text-red-600">{errors.village}</span>}
                </label>
                <hr className="my-1" />
                <label>
                  Taluko Name
                  <select name="taluka" className='input-fields' value={formData.taluka} required onChange={handleChange}>
                    <option value="">Select Taluko</option>
                    {talukaData.map((option) => (
                      <option key={option._id} value={option.name}>{option.name}</option>
                    ))}
                  </select>
                  {errors.taluka && <span className="error text-red-600">{errors.taluka}</span>}
                </label>
                <hr className="my-1" />
                <label>
                  District
                  <select name="district" className='input-fields' value={formData.district} required onChange={handleChange}>
                    <option value="">Select District</option>
                    {districtData.map((option) => (
                      <option key={option._id} value={option.name}>{option.name}</option>
                    ))}
                  </select>
                  {errors.district && <span className="error text-red-600">{errors.district}</span>}
                </label>
                <hr className="my-1" />
                {edit ? ("") : (
                  <label>
                    Education
                    <select name="education" className='input-fields' value={formData.education} required onChange={handleChange}>
                      <option value="">Select Education</option>
                      {education.map((option) => (
                        <option key={option._id} value={option.name}>{option.name}</option>
                      ))}
                    </select>
                    {errors.education && <span className="error text-red-600">{errors.education}</span>}
                  </label>
                )}
                <hr className="my-1" />
                <label>
                  Blood Group
                  <select name="bloodGroup" className='input-fields' value={formData.bloodGroup} required onChange={handleChange}>
                    <option value="">Select Blood Group</option>
                    {bloodGroup.map((option) => (
                      <option key={option._id} value={option.name}>{option.name}</option>
                    ))}
                  </select>
                  {errors.bloodGroup && <span className="error text-red-600">{errors.bloodGroup}</span>}
                </label>
                <hr className="my-1" />
              </div>
              <div className="button-container">
                {edit ? (<button className="submit-button" type="submit">Edit Member</button>) : (<button className="submit-button" type="submit">Save Member</button>)}
              </div>
            </form>
          </Modal>
          <Modal isOpen={viewModalOpen} onClose={closeViewModal}>
            <div>
              <div className="modal-headerView">
                <h1 className='text-[23px]'>View Member Details</h1>
                <button onClick={closeViewModal}><IoMdClose className='text-3xl' /></button>
              </div>
              <div>
                {viewMemberData && (
                  <div className="view-modal-content form-grid">
                    <div className="column mt-5">
                      <img src={imageUrl} alt="Member Photo" />
                      {/* <img src={logo} alt="logo" width={"250px"} className='ml-auto mr-auto rounded-3xl' /> */}
                      <h1 className='flex mt-3  justify-evenly'>
                        <span className='text-xl text-indigo-600 ml-2'>{viewMemberData.name}</span>
                      </h1>
                    </div>
                    <div className="column">
                      <h1 className=' my-3 flex justify-evenly'>
                        <span className='text-xl text-gray-500'>Mobile Number</span>
                        <span>:</span>
                        <span className='text-xl text-black ml-2'>{viewMemberData.mobile}</span>
                      </h1>
                      <hr />
                      <h1 className='my-3 flex justify-evenly'>
                        <span className='text-xl text-gray-500'>Village Name</span>
                        <span>:</span>
                        <span className='text-xl text-black ml-2'>{viewMemberData.village}</span>
                      </h1>
                      <hr />
                      <h1 className='my-3 flex justify-evenly'>
                        <span className='text-xl text-gray-500'>Taluka Name</span>
                        <span>:</span>
                        <span className='text-xl text-black ml-2'>{viewMemberData.taluka}</span>
                      </h1>
                      <hr />
                      <h1 className='my-3 flex justify-evenly'>
                        <span className='text-xl text-gray-500'>District Name</span>
                        <span>:</span>
                        <span className='text-xl text-black ml-2'>{viewMemberData.district}</span>
                      </h1>
                      <hr />
                      <h1 className='my-3 flex justify-evenly'>
                        <span className='text-xl text-gray-500'>Blood Group</span>
                        <span>:</span>
                        <span className='text-xl text-black ml-2'>{viewMemberData.bloodGroup}</span>
                      </h1>
                      <hr />
                      <h1 className='my-3 flex justify-evenly'>
                        <span className='text-xl text-gray-500'>Gender</span>
                        <span>:</span>
                        <span className='text-xl text-black ml-2'>{viewMemberData.gender}</span>
                      </h1>
                      <hr />
                      <h1 className='my-3 flex justify-evenly'>
                        <span className='text-xl text-gray-500'>Birth Date</span>
                        <span>:</span>
                        <span className='text-xl text-black ml-2'>{viewMemberData.birthDate}</span>
                      </h1>
                      <hr />
                      <h1 className='my-3 flex justify-evenly items-center'>
                        <span className='text-xl text-gray-500'>Address</span>
                        <span>:</span>
                        <span className='text-[0.8rem] text-black ml-2'>{viewMemberData.address}</span>
                      </h1>
                      <hr />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Modal>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white my-5">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">No</th>
                  <th className="py-2 px-4 border-b">Member Photo</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Mobile No.</th>
                  <th className="py-2 px-4 border-b">View</th>
                  <th className="py-2 px-4 border-b">Update</th>
                  <th className="py-2 px-4 border-b">Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((member, index) => (
                  <tr key={member._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                    <td className='py-2 px-4 border-b'><img src={member.photo} className='w-10 h-10 ml-auto mr-auto'/></td>
                    <td className="py-2 px-4 border-b text-center">{member.name}</td>
                    <td className="py-2 px-4 border-b text-center">{member.mobile}</td>
                    <td className="py-2 px-4 border-b text-center">
                      <button onClick={() => openViewModal(member)}>
                        <FaUsersViewfinder />
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <button onClick={() => handleEdit(member._id)}>
                        <GrDocumentUpdate />
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <button onClick={() => handleDelete(member._id)}>
                        <AiFillDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
  export default Members;