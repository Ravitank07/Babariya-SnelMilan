import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validateForm = () => {
        const mobilePattern = /^[0-9]{10}$/;
        if (mobile === "") {
            setError("Mobile number is required.");
            return false;
        }
        if (!mobilePattern.test(mobile)) {
            setError("Invalid mobile number.");
            return false;
        }
        return true;
    };

    const login = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        let loginItems = { mobile };
        try {
            let response = await fetch("http://localhost:8000/api/admin/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginItems)
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    throw new Error("User not registered. Please register first.");
                }
            }

            let result = await response.json();
            console.log("result", result);
            navigate("/otp", { state: { mobile } });
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message);
        }
    };
    return (
        <section className="h-screen flex items-center justify-center p-[10rem]">
            <div className="w-full max-w-4xl bg-box py-[7rem] px-[4rem] main">
                <form onSubmit={login}>
                    <div className="flex flex-col items-center justify-center ">
                        <p className="mb-4 text-[3rem]">Login</p>
                    </div>
                    <div className="mb-6">
                        <label className="block text-[2rem] font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="mobile-number"
                            className="password mt-1 py-4 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter Number"
                            pattern="[0-9]{10}"
                            maxLength="10"
                            inputMode="numeric"
                            onChange={(e) => setMobile(e.target.value)}
                            onKeyPress={(event) => {
                                const charCode = event.charCode;
                                if (charCode < 48 || charCode > 57) {
                                    event.preventDefault();
                                }
                            }}
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-[2rem] border border-transparent rounded-md shadow-sm text-2xl font-medium text-white btn-submit focus:outline-none focus:ring-2 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                {error && (
                    <p className="mt-2 text-center text-[1.5rem] text-red-500">{error}</p>
                )}
                <p className="mt-2 text-center text-[1.5rem] text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-black hover:text-indigo-400 hover:text-bold">
                        Register
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Login;
