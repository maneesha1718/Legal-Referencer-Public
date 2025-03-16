'use client'
import { useState, useRef } from 'react';
import Link from "next/link";


import Button from './util/Button';

const OtpInput = ({ length = 6, email, password }) => {

  const [otp, setOtp] = useState(new Array(length).fill(""));
    const [message, setMessage] = useState('');
  const inputRefs = useRef([]); 

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;  // Only allow numeric values

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);  // Ensure only one digit per input
    setOtp(newOtp);

    // Move focus to next input if available and digit is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (event) => {
    const pastedData = event.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const otpArray = pastedData.split("").slice(0, length);
      setOtp(otpArray);
      inputRefs.current[length - 1].focus();
      //onComplete(pastedData);
    }
  };

  const verifyOtp = async () => {

    const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password, otp }),
		};

    try {
      const response = await fetch("/api/verify-otp", requestOptions);
  
      if (response.ok) {
        // OTP verified successfully, no need to handle redirection in frontend
        // The server will handle the redirect after a successful response
        window.location.href = '/';
      } else {
        const data = await response.json();
        setMessage(data.message); // Display error message if any
      }
    } catch (error) {
      setMessage("Something went wrong, please try again.");
    }
  };

  return (
    <form   
      className="flex h-[calc(100vh-57px)] items-center justify-center"
    >
      <div className="bg-card flex flex-col justify-center gap-4 text-center text-card-foreground mx-auto max-w-sm rounded-lg border border-l-grey shadow-sm p-6">
        <div className="flex flex-col space-y-1.5">
          <div className="text-lg content-center text-center font-semibold leading-none tracking-tight">
            Verify email
          </div>
          <p className="text-sm text-black text-opacity-70">
            {` An OTP has been sent to ${email} `}
          </p>
        </div>
    <div onPaste={handlePaste} className='flex justify-center gap-3 pb-4 pt-0'>
      {otp.map((digit, index) => (
        <input className=' w-8 h-9 text-center text-lg border-[1.5px] border-solid border-tableBorder-dgray rounded-sm outline-none active:border-black focus:border-black hover:border-black '
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
        />
      ))}
    </div>
    <Button
                type="button"
                onClick={verifyOtp}
                variant="loginButton"
                className=" bg-black py-1.5 "
              >
                Create Account
              </Button>
              <p className='text-sm font-medium text-black text-opacity-70'>(Make sure to check in spam)</p>
              {message && ( 
                <p >{message}</p>)}

                {message && message == 'User is already registered!' && (
                  <p className="text-center">
                  <Link
                    href="/login"
                    className=" text-sm text-dark-blue underline "
                  >
                    Login with existing account.
                  </Link>
                </p>
                )}
              
    </div>
    </form>
  );
};

export default OtpInput;