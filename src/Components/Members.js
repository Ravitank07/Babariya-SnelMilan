import React, { useState, useEffect } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import './Members.css';
import { IoMdArrowDropdown } from "react-icons/io";
import { IoClose } from "react-icons/io5";

Modal.setAppElement('#root');

const Members = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [gender, setGender] = useState('Male');
  const [status, setStatus] = useState('married');
  const [dropdownOpenVillage, setDropdownOpenVillage] = useState(false);
  const [dropdownOpenTaluko, setDropdownOpenTaluko] = useState(false);
  const [dropdownOpenDis, setDropdownOpenDis] = useState(false);
  const [dropdownOpenEducation, setDropdownOpenEducation] = useState(false);
  const [dropdownOpenBloodGroup, setDropdownOpenBloodGroup] = useState(false);

  const [selectedVillage, setSelectedVillage] = useState('Select Village');
  const [selectedTaluka, setSelectedTaluka] = useState('Select Taluko');
  const [selectedDistrict, setSelectedDistrict] = useState('Select District');
  const [selectedEducation, setSelectedEducation] = useState('Select Education');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('Select Blood Group');
  
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/district/viewAll')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setDistricts(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      })
      .catch(error => console.error('Error fetching districts:', error));
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
    setSidebarOpen(false);
    setNavbarVisible(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSidebarOpen(true);
    setNavbarVisible(true);
  };

  const toggleDownVillage = () => {
    setDropdownOpenVillage(!dropdownOpenVillage);
  };
  const selectVillage = (village) => {
    setSelectedVillage(village);
    setDropdownOpenVillage(false);
  };

  const toggleDownTaluko = () => {
    setDropdownOpenTaluko(!dropdownOpenTaluko);
  };
  const selectTaluka = (taluka) => {
    setSelectedTaluka(taluka);
    setDropdownOpenTaluko(false);
  };

  const toggleDownDistrict = () => {
    setDropdownOpenDis(!dropdownOpenDis);
  };
  const selectDistrict = (district) => {
    setSelectedDistrict(district);
    setDropdownOpenDis(false);
  };

  const toggleDownEducation = () => {
    setDropdownOpenEducation(!dropdownOpenEducation);
  };
  const selectEducation = (education) => {
    setSelectedEducation(education);
    setDropdownOpenEducation(false);
  };

  const toggleDownBloodGroup = () => {
    setDropdownOpenBloodGroup(!dropdownOpenBloodGroup);
  };
  const selectBloodGroup = (bloodGroup) => {
    setSelectedBloodGroup(bloodGroup);
    setDropdownOpenBloodGroup(false);
  };

  return (
    <>
      <div className='ml-auto mr-[2rem] my-[2rem] bg-black text-white w-[14rem] flex items-center px-7 py-4 btn-submit rounded-lg'>
        <FaUserPlus className='text-[14px] mr-3 text-white' />
        <button onClick={openModal}><p className='text-white font-semibold'>Add Member</p></button>
      </div>
      <hr />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Member"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-header">
          <h1 className='text-[23px]'>Add a New Member</h1>
          <button onClick={closeModal}><IoClose className='text-3xl' /></button>
        </div>
        <form className="form-grid">
          <div className="form-column">
            {/* F-1 */}
            <label>
              Name
              <input type="text" name="name" className='input-fields' placeholder='Enter Member name' required />
            </label>
            {/* F-2 */}
            <label>
              Mobile Number
              <input type="tel" name="mobile" className='input-fields' placeholder='Enter Member Mobile Number' required />
            </label>
            {/* F-3 */}
            <label className="flex items-center">
              Gender :
              <div className="form flex items-center mt-3 ml-[2px]">
                <label className="flex items-center ml-2">
                  <input type="radio" name="gender" className="custom-radio" value="Male" checked={gender === 'Male'} onChange={() => setGender('Male')} />
                  <span className="custom-radio-label mt-2 ml-1">Male</span>
                </label>
                <label className="form flex items-center ml-2">
                  <input type="radio" name="gender" className="custom-radio" value="Female" checked={gender === 'Female'} onChange={() => setGender('Female')} />
                  <span className="custom-radio-label mt-2 ml-1">Female</span>
                </label>
              </div>
            </label>

            {/* F-4 */}
            <label>
              Residence Address
              <input type="text" name="address" className='input-fields' placeholder='Enter Member Residence Address' />
            </label>
            {/* F-5 */}
            <label>
              Birth Date
              <input type="date" name="birthdate" className='input-fields' required />
            </label>
            {/* F-6 */}
            <label className="flex items-center">
              Marital status :
              <div className="form flex items-center mt-3 ml-[2px]">
                <label className="flex items-center ml-2">
                  <input type="radio" name="status" className="custom-radio" value="married" checked={status === 'married'} onChange={() => setStatus('married')} />
                  <span className="custom-radio-label mt-2 ml-1">Married</span>
                </label>
                <label className="form flex items-center ml-2">
                  <input type="radio" name="status" className="custom-radio" value="unmarried" checked={status  === 'unmarried'} onChange={() => setStatus('unmarried')} />
                  <span className="custom-radio-label mt-2 ml-1">Unmarried</span>
                </label>
              </div>
            </label>
            {/* F-7 */}
            <label>
              Upload Member's Image
              <input type="file" name="image" className='input-fields' placeholder='Upload Member Profile Image' required />
            </label>
          </div>
          <div className="form-column">
            {/* F-8 */}
            <div className='flex items-center my-4 z-[44]'>
              <label className="mr-5 font-semibold mt-4">Village Name : </label>
              <div className="relative" id='dropDownButton'>
                <div onClick={toggleDownVillage} className='border-solid border-black-200 border-[2px] px-5 py-2 rounded cursor-pointer font-bold flex justify-between w-[450px] items-center bg-white'>
                  {selectedVillage}
                  <IoMdArrowDropdown className='text-xl' id="dropdown" />
                </div>
                {dropdownOpenVillage && (
                  <div className='rounded border-[1px] border-grey-300 bg-white absolute top-[30px] w-[450px] shadow-md'>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectVillage('Village Name 1')}>Village Name 1</div>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectVillage('Village Name 2')}>Village Name 2</div>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectVillage('Village Name 3')}>Village Name 3</div>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectVillage('Village Name 4')}>Village Name 4</div>
                  </div>
                )}
              </div>
            </div>
            {/* F-9 */}
            <div className='flex items-center my-4 z-[43]'>
              <label className="mr-5 font-semibold mt-4">Taluko Name : </label>
              <div className="relative" id='dropDownButton'>
                <div onClick={toggleDownTaluko} className='border-solid border-black-200 border-[2px] px-5 py-2 rounded cursor-pointer font-bold flex justify-between w-[450px] items-center bg-white'>
                  {selectedTaluka}
                  <IoMdArrowDropdown className='text-xl' id="dropdown" />
                </div>
                {dropdownOpenTaluko && (
                  <div className='rounded border-[1px] border-grey-300 bg-white absolute top-[30px] w-[450px] shadow-md'>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectTaluka('Taluko Name 1')}>Taluko Name 1</div>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectTaluka('Taluko Name 2')}>Taluko Name 2</div>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectTaluka('Taluko Name 3')}>Taluko Name 3</div>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectTaluka('Taluko Name 4')}>Taluko Name 4</div>
                  </div>
                )}
              </div>
            </div>
            {/* F-10 */}
            <div className='flex items-center my-4 z-[42]'>
              <label className="mr-5 font-semibold mt-4">District : </label>
              <div className="relative" id='dropDownButton'>
                <div onClick={toggleDownDistrict} className='border-solid border-black-200 border-[2px] px-5 py-2 rounded cursor-pointer font-bold flex justify-between w-[450px] items-center bg-white'>
                  {selectedDistrict}
                  <IoMdArrowDropdown className='text-xl' id="dropdown" />
                </div>
                {dropdownOpenDis && (
                  <div className='rounded border-[1px] border-grey-300 bg-white absolute top-[30px] w-[450px] shadow-md'>
                    {districts.map((district) => (
                      <div key={district.id} className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectDistrict(district.name)}>
                        {district.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* F-11 */}
            <div className='flex items-center my-4 z-[41]'>
              <label className="mr-5 font-semibold mt-4">Education : </label>
              <div className="relative" id='dropDownButton'>
                <div onClick={toggleDownEducation} className='border-solid border-black-200 border-[2px] px-5 py-2 rounded cursor-pointer font-bold flex justify-between w-[450px] items-center bg-white'>
                  {selectedEducation}
                  <IoMdArrowDropdown className='text-xl' id="dropdown" />
                </div>
                {dropdownOpenEducation && (
                  <div className='rounded border-[1px] border-grey-300 bg-white absolute top-[30px] w-[450px] shadow-md'>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectEducation('Education 1')}>Education 1</div>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectEducation('Education 2')}>Education 2</div>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectEducation('Education 3')}>Education 3</div>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectEducation('Education 4')}>Education 4</div>
                  </div>
                )}
              </div>
            </div>
            {/* F-12 */}
            <div className='flex items-center my-4 z-[40]'>
              <label className="mr-5 font-semibold mt-4">Blood Group : </label>
              <div className="relative" id='dropDownButton'>
                <div onClick={toggleDownBloodGroup} className='border-solid border-black-200 border-[2px] px-5 py-2 rounded cursor-pointer font-bold flex justify-between w-[450px] items-center bg-white'>
                  {selectedBloodGroup}
                  <IoMdArrowDropdown className='text-xl' id="dropdown" />
                </div>
                {dropdownOpenBloodGroup && (
                  <div className='rounded border-[1px] border-grey-300 bg-white absolute top-[30px] w-[450px] shadow-md'>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectBloodGroup('A+')}>A+</div>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectBloodGroup('A-')}>A-</div>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectBloodGroup('B+')}>B+</div>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectBloodGroup('B-')}>B-</div>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectBloodGroup('AB+')}>AB+</div>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectBloodGroup('AB-')}>AB-</div>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectBloodGroup('O+')}>O+</div>
                    <div className='cursor-pointer hover:bg-gray-200 p-5' onClick={() => selectBloodGroup('O-')}>O-</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
        <div className="button-container">
          <button className="submit-button" type="submit">Save Member</button>
        </div>
      </Modal>
    </>
  );
};

export default Members;
