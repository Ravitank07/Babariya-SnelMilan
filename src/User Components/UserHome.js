import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserBreadCrumb from "../Components/Modal/UserBreadCrub";
import { TokenContext } from '../Context/TokenProvider';
import logo from '../Images/Ravi.jpg';
const UserHome = () => {
    const { token } = useContext(TokenContext);
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (token) {
            axios.get('http://localhost:8000/api/member/view', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    setUserInfo(response.data.data);
                })
                .catch(error => {
                    setError(error.message);
                });
        }
    }, [token]);

    return (
        <>
            <div className='pt-[6rem] px-5 h-screen overflow-auto'>
                <UserBreadCrumb />
                <div>
                    {error && <p className="text-red-500">{error}</p>}
                    {userInfo ? (
                        <div className=' p-5 mt-3 flex flex-col md:flex-row md:space-x-10 bg-white border-gray-500 border-2 rounded-lg '>

                            <div className='md:w-1/2 space-y-4 mr-0'>
                                <div className='flex justify-center flex-col items-center'>
                                    <img src={logo} alt='Member' className='w-[20rem] h-[26rem] rounded-[1rem]' />
                                    <p className='text-3xl my-2 text-blue-700 '>{userInfo.name}</p>
                                </div>

                            </div>
                            <div className='md:w-1/2 space-y-5 !ml-[2rem]'>
                                <h2 className='text-2xl text-center text-white bg-slate-500 rounded-md' >Member Information</h2>

                                <div className='flex justify-between profile-info-item'>
                                    <span className='text-gray-600 profile-info-label'>Mobile :</span>
                                    <span>{userInfo.mobile}</span>
                                </div>
                                <div className='flex justify-between profile-info-item'>
                                    <span className='text-gray-600 profile-info-label' >Gender :</span>
                                    <span>{userInfo.gender}</span>
                                </div>
                                <div className='flex justify-between profile-info-item'>
                                    <span className='text-gray-600 profile-info-label'>Village :</span>
                                    <span>{userInfo.village}</span>
                                </div>
                                <div className='flex justify-between profile-info-item'>
                                    <span className='text-gray-600 profile-info-label'>Taluka :</span>
                                    <span>{userInfo.taluka}</span>
                                </div>
                                <div className='flex justify-between profile-info-item'>
                                    <span className='text-gray-600 profile-info-label'>District :</span>
                                    <span>{userInfo.district}</span>
                                </div>
                                <div className='flex justify-between profile-info-item'>
                                    <span className='text-gray-600 profile-info-label'>Birth Date :</span>
                                    <span>{userInfo.birthDate}</span>
                                </div>
                                <div className='flex justify-between profile-info-item'>
                                    <span className='text-gray-600 profile-info-label'>Marital Status :</span>
                                    <span>{userInfo.maritalStatus}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserHome;
