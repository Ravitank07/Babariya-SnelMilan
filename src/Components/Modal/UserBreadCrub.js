import React from 'react'
import '../Modal/BreadCrumb.css'
import { Link, useLocation } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
const BreadCrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
    return (
        <>
            <div className="breadcrumb text-black">
                {pathnames.length > 0 && pathnames[0] !== "" && ( // Conditionally render Home link
                    <Link to="/userProfile" className="text-black hover:underline">
                        <IoHome className='text-2xl' />
                    </Link>
                )}
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    if (value.toLowerCase() === 'utility') {
                        return (
                            <span key={to}>
                                <span className="mx-2">/</span>
                                <Link to={to} className="text-black hover:underline">
                                    Utility
                                </Link>
                            </span>
                        );
                    }
                    return (
                        <span key={to} className='text-2xl'>
                            <span className="mx-2">/</span>
                            {isLast ? (
                                <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
                            ) : (
                                <Link to={to} className="text-black hover:underline">
                                    {value.charAt(0).toUpperCase() + value.slice(1)}
                                </Link>
                            )}
                        </span>
                    );
                })}
            </div>
        </>
    )
}

export default BreadCrumb
