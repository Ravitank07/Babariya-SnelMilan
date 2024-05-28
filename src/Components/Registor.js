import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const validateForm = () => {
        const mobilePattern = /^[0-9]{10}$/;
        if (name === "" || mobile === "") {
            setError("All fields are required.");
            return false;
        }
        if (!mobilePattern.test(mobile)) {
            setError("Invalid mobile number.");
            return false;
        }
        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        let items = { name, mobile };

        try {
            let response = await fetch("http://localhost:8000/api/admin/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items),
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error(`Unexpected response from server: ${text}`);
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Already Registration');
            }

            let result = await response.json();
            console.log("Registration successful", result);
            navigate("/");
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.message);
        }
    };

    return (
        <section className="h-screen flex items-center justify-center p-[10rem]">
            <div className="w-full max-w-3xl py-[7rem] px-[4rem] main">
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col items-center justify-center ">
                        <p className="mb-4 text-[3rem]">Registration</p>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-[2rem] font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="username mt-1 py-4 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter Name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="mobile-number" className="block text-[2rem] font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            id="mobile-number"
                            className="password mt-1 py-4 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter Number"
                            onChange={(e) => setMobile(e.target.value)}
                            value={mobile}
                            pattern="[0-9]{10}"
                            minLength="10"
                            maxLength="10"
                            inputMode="numeric"
                            required
                        />
                    </div>
                    {error && (
                        <div className="mb-4 text-red-500 text-center text-2xl">
                            {error}
                        </div>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-[2rem] border border-transparent rounded-md shadow-sm text-2xl font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 reg_btn"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <p className="mt-2 text-center text-[1.2rem] text-gray-600">
                    Already have an account?{" "}
                    <Link to="/" className="text-black hover:text-indigo-500">
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Registration;
