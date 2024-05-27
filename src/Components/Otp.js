import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const OTPPage = () => {
    const [otp, setOTP] = useState(new Array(6).fill(''));
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { mobile } = location.state || {};

    useEffect(() => {
        if (!mobile) {
            navigate("/");
        }
    }, [mobile, navigate]);

    const handleChange = (element, index) => {
        if (/^\d*$/.test(element.value)) {
            const newOTP = [...otp];
            newOTP[index] = element.value;
            setOTP(newOTP);

            if (element.nextSibling && element.value) {
                element.nextSibling.focus();
            }
        }
    };

    const otpLogin = async (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
            setError("Please enter a 6-digit OTP.");
            return;
        }
        
        const loginItems = { mobile, otp: otpValue };

        try {
            const response = await fetch(`http://localhost:8000/api/admin/verifyOtp/${mobile}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginItems)
            });

            if (!response.ok) {
                throw new Error(`Please Enter Correct OTP`);
            }

            const result = await response.json();
            console.log("result", result);
            navigate("/home");
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message);
        }
    };

    return (
        <section className="h-screen flex items-center justify-center p-[10rem]">
            <div className="w-full max-w-4xl bg-box py-[7rem] px-[4rem] main">
                <form onSubmit={otpLogin}>
                    <div className="flex flex-col items-center justify-center ">
                        <p className="mb-4 text-[3rem]">Enter OTP</p>
                    </div>
                    <div className="flex justify-center mb-6 space-x-2">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onFocus={e => e.target.select()}
                                className="w-12 h-12 text-center text-[2rem] py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        ))}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-[2rem] border border-transparent rounded-md shadow-sm text-2xl font-medium text-white btn-submit focus:outline-none focus:ring-2 focus:ring-offset-2"
                            disabled={otp.join('').length !== 6}
                        >
                            Verify OTP
                        </button>
                    </div>
                </form>
                {error && (
                    <p className="mt-2 text-center text-[1.5rem] text-red-500">{error}</p>
                )}
                <p className="mt-2 text-center text-[1.5rem] text-gray-600">
                    Didn't receive the OTP?{" "}
                    <Link to="/resend-otp" className="text-black hover:text-indigo-500">
                        Resend OTP
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default OTPPage;
