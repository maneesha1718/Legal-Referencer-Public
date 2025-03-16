"use client";

import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import Link from "next/link";
import { login, passwordResetMail } from "@/app/login/actions";
import Input from "@/components/util/Input";
import Button from "@/components/util/Button";
import OAuthButtons from "@/app/login/oauth-signin";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const [formState, formAction, pending] = useActionState(login, {});
  const [emailFormState, setEmailFormState] = useState({
    errors: {},
    pending: false,
  });
  const [jsonResponse, setJsonResponse] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    setEmailFormState((prevState) => ({
      ...prevState,
      pending: true,
    }));

    const emailData = await passwordResetMail(formData);
    const email = emailData.email;

    if (emailData.errors) {
      // Handle errors, set form state for UI feedback
      setEmailFormState({
        errors: emailData.errors,
        pending: false,
      });
    }

    const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		};
    const res = await fetch("/api/reset-password", requestOptions);

    const data = await res.json();
    setJsonResponse(data);
  };


  if(message == 'reset'){
    if ( jsonResponse && Object.keys(jsonResponse).length === 0) {
      return (
        <div
            className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-xs bg-white shadow-lg rounded-lg p-6 relative">

                <div className=" text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-14 shrink-0 fill-[#10B981] inline" viewBox="0 0 512 512">
                        <path
                            d="M383.841 171.838c-7.881-8.31-21.02-8.676-29.343-.775L221.987 296.732l-63.204-64.893c-8.005-8.213-21.13-8.393-29.35-.387-8.213 7.998-8.386 21.137-.388 29.35l77.492 79.561a20.687 20.687 0 0 0 14.869 6.275 20.744 20.744 0 0 0 14.288-5.694l147.373-139.762c8.316-7.888 8.668-21.027.774-29.344z"
                            data-original="#000000" />
                        <path
                            d="M256 0C114.84 0 0 114.84 0 256s114.84 256 256 256 256-114.84 256-256S397.16 0 256 0zm0 470.487c-118.265 0-214.487-96.214-214.487-214.487 0-118.265 96.221-214.487 214.487-214.487 118.272 0 214.487 96.221 214.487 214.487 0 118.272-96.215 214.487-214.487 214.487z"
                            data-original="#000000" />
                    </svg>
                    <h4 className="text-xl text-black/90 font-semibold mt-4">Email Sent Successfully!</h4>
                    <p className="text-sm text-black/95 leading-relaxed mt-4">A password reset link has been sent to your email address.</p>
                </div>
            </div>
        </div>
      );
    }
    else{
    return(
      <form onSubmit={handleEmailSubmit}
      className="flex h-[calc(100vh-57px)] items-center justify-center"
    >
      <div className="bg-card text-card-foreground mx-auto max-w-sm rounded-lg border border-l-grey shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
        <div className="text-xl font-semibold leading-none tracking-tight">
            Reset Password mail
          </div>
          <p className="text-sm text-black text-opacity-40">
            Please enter email to reset password
          </p>
        </div>
        <div className="flex flex-col gap-2 p-6 pt-0">
          <div className="grid gap-2">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              htmlFor="email"
              label="Enter email"
              size="login"
              required
            />
          </div>

          {emailFormState.errors && (
            <ul id="form-errors">
              {Object.keys(emailFormState.errors).map((error) => (
                <li className="text-red text-sm " key={error}>
                  {emailFormState.errors[error]}
                </li>
              ))}
            </ul>
          )}
          <Button
            type="submit"
            variant="loginButton"
            className=" bg-black py-1.5 "
            disabled={pending}
          >
            Confirm Email
          </Button>
        </div>
      </div>
    </form>
    )}
  }

  return (
    <form
      id="auth-form"
      action={formAction}
      className="flex h-[calc(100vh-57px)] items-center justify-center"
    >
      <div className="bg-card text-card-foreground mx-auto max-w-xs lg:max-w-md rounded-lg border border-l-grey shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
        <div className="text-2xl font-semibold leading-none tracking-tight">
            Login
          </div>
          <p className="text-sm text-black text-opacity-40">
            Enter your credentials below to login with your account
          </p>
        </div>
        <div className="flex flex-col gap-2 p-6 pt-0">
          <div className="grid gap-2">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              htmlFor="email"
              label="Email"
              size="login"
              required
            />
          </div>
          <div className="grid gap-2">
            <Input
              minLength={6}
              name="password"
              id="password"
              type="password"
              htmlFor="password"
              label="Password"
              size="login"
              required
            />
          </div>
          {formState.errors && (
            <ul id="form-errors">
              {Object.keys(formState.errors).map((error) => (
                <li className="text-red" key={error}>
                  {formState.errors[error]}
                </li>
              ))}
            </ul>
          )}
          <Button
            type="submit"
            variant="loginButton"
            className=" bg-black py-1.5 "
            disabled={pending}
          >
            Login
          </Button>
          <OAuthButtons className="w-full text-center" />
          <Link href='/login?message=reset' className="text-center text-sm text-dark-blue underline ">
                Forgot Password
          </Link>
          <p className="text-center">
              <Link
                href="/signup"
                className=" text-sm text-dark-blue underline "
              >
                Create new account.
              </Link>
          </p>
        </div>
        {message && (
          <div className="text-red text-sm font-normal pl-4 pb-4 ">{message}!</div>
        )}
      </div>
    </form>
  );
}