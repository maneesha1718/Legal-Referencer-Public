'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import Input from '@/components/util/Input';
import Button from '@/components/util/Button';
import { passwordreset } from '../login/actions';

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const code = searchParams.get('code');

    if (!code) {
      setError('Invalid or expired reset token.');
      return;
    }

    // Step 1: Verify the OTP (reset token)

    const result = await  passwordreset({code, password});

    if(result){
      setMessage(result)
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-[calc(100vh-57px)] items-center justify-center">
      <div className="bg-card text-card-foreground mx-auto max-w-sm rounded-lg border border-l-grey shadow-sm">
        <div className="flex flex-col space-y-1 p-6 pb-3">
          <div className="text-xl font-semibold leading-none tracking-tight">Reset Password</div>
          <p className="text-sm text-black text-opacity-40">Create a new password</p>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col gap-2 p-6 pt-0">
          <Input
            minLength={6}
            name="password"
            id="password"
            type="password"
            htmlFor="password"
            label="Password"
            required
            value={password}
            onChange={handlePasswordChange}
            size="login"
          />
          <Input
            minLength={6}
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
          {passwordError && <div className="text-red text-sm font-normal">{passwordError}</div>}
          <Button type="submit" variant="loginButton" className="bg-black py-1.5" disabled={passwordError !== ""}>
            Change Password
          </Button>
        </div>
        {message && <p className="text-green-500">{message}</p>}
      </div>
    </form>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
