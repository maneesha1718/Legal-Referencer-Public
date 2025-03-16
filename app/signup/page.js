"use client";

import { MoveRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import { signup } from "@/app/login/actions";
import Input from "@/components/util/Input";
import Button from "@/components/util/Button";
import OAuthButtons from "@/app/login/oauth-signin";
import OtpInput from '@/components/OtpInput';

export default function Signup() {
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formState, setFormState] = useState({
    errors: {},
    pending: false,
  });
  const [userData, setUserData] = useState(null);


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  // Submit handler with redirection logic
  const handleSubmit = async (event) => {

    event.preventDefault();

    const formData = new FormData(event.target);

    setFormState((prevState) => ({
      ...prevState,
      pending: true,
    }));

    const signUpData = await signup(formData);
    const email = signUpData.email;

    if (signUpData.errors) {
      // Handle errors, set form state for UI feedback
      setFormState({
        errors: signUpData.errors,
        pending: false,
      });
    }

    if(!signUpData.errors){
      setUserData(signUpData);
      const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		};

    const res = await fetch("/api/mail", requestOptions);
		const json = await res.json();
		return json;
    }

    

  };

  if(userData){
    return(
      <OtpInput email ={userData.email} password={userData.password} />
    )
  }

  return (
    <form
      id="auth-form"
      onSubmit={handleSubmit} // Handle form submit
      className="flex h-[calc(100vh-57px)] items-center justify-center"
    >
      <div className="bg-card text-card-foreground mx-auto max-w-sm rounded-lg border border-l-grey shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="text-2xl font-semibold leading-none tracking-tight">
            Signup
          </div>
          <p className="text-sm text-black text-opacity-40">
            Create an account with your mail and password
          </p>
        </div>
        <div className="flex flex-col gap-2 p-2 pt-0">
          <div className="grid gap-2">
            <Input
              id="email"
              name="email"
              type=""
              placeholder="m@example.com"
              htmlFor="email"
              label="Email"
              size="login"
              required
            />
          </div>
          {formState.errors.email && (
            <div className="text-red text-sm font-normal ">
              {formState.errors.email}
            </div>
          )}
          <div className="grid gap-2">
            <Input
              minLength={0}
              type="password"
              name="password"
              id="password"
              htmlFor="password"
              label="Password"
              required
              value={password}
              onChange={handlePasswordChange}
              size="login"
            />
          </div>
          
          <div className="grid gap-2">
            <Input
              minLength={0}
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              htmlFor="confirmPassword"
              label="Confirm Password"
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              size="login"
            />
          </div>

          {passwordError && (
            <div className="text-red text-sm font-normal">
              {passwordError}
            </div>
          )}
          {formState.errors.password && (
            <div className="text-red text-sm font-normal ">
              {formState.errors.password}
            </div>
          )}      
          
          <Button
            type="submit"
            variant="loginButton"
            className="flex justify-center gap-2 align-middle bg-black py-1.5"
            disabled={!formState.errors && passwordError !== "" || formState.pending}
          >
            <p>Next</p>
            <p><MoveRight /></p>         
          </Button>
          <OAuthButtons className="w-full text-center" />
          <p className="text-center">
            <Link
              href="/login"
              className=" text-sm text-dark-blue underline "
            >
              Login with existing account.
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
