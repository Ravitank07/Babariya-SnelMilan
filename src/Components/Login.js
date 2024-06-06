import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // To indicate loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!mobile || mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setIsLoading(true); // Start loading

      const response = await fetch(`http://localhost:8000/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile }),
      });

      if (!response.ok) {
        throw new Error("Failed to login for this number. please enter current number.");
      }

      // On successful OTP request, navigate to the OTP page
      navigate('/otp', { state: { mobile } });
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <section className="h-screen flex items-center justify-center p-[10rem]">
      <div className="w-full max-w-3xl py-[7rem] px-[4rem] main">
        <form onSubmit={handleLogin}>
          <div className="flex flex-col items-center justify-center">
            <p className="mb-4 text-[3rem]">Login</p>
          </div>
          <div className="mb-6">
            <input
              type="text"
              maxLength="10"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              className="w-full h-12 text-[2rem] py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading} // Disable button while loading
              className={`w-full flex justify-center py-3 px-[2rem] border border-transparent rounded-md shadow-sm text-2xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </div>
        </form>
        {error && (
          <p className="mt-2 text-center text-[1.5rem] text-red-500">{error}</p>
        )}
      </div>
    </section>
  );
};

export default Login;
