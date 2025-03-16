import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function POST(req) {
  const { email, password, otp } = await req.json(); // Get data from the request body

  const enteredOtp = otp.map(String).join('');

  if (!email || !enteredOtp) {
    return new Response(JSON.stringify({ message: 'Email and OTP are required' }), { status: 400 });
  }

  // Fetch OTP from Supabase
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('otps')
    .select('otp, expires_at')
    .eq('email', email)
    .single();

  if (error || !data) {
    return new Response(JSON.stringify({ message: 'Invalid OTP or email' }), { status: 400 });
  }

  // Check if OTP is expired
  const now = new Date();
  const expiresAt = new Date(data.expires_at);

  if (now > expiresAt) {
    await supabase.rpc('delete_expired_otps');
    return new Response(JSON.stringify({ message: 'OTP has expired' }), { status: 400 });
  }

  if (data.otp !== enteredOtp) {
    return new Response(JSON.stringify({ message: 'Incorrect OTP' }), { status: 400 });
  }

  if (data.otp === enteredOtp) {
    const userData = {
      email: email,
      password: password,
    };

    // OTP is valid, delete it after successful verification
    await supabase.from('otps').delete().eq('email', email);
    const { error } = await supabase.auth.signUp(userData);
    if (error) {
      console.error('Sign-up error:', error.message);
      if(error.message == 'User already registered'){
        return new Response(JSON.stringify({ message: 'User is already registered!' }), { status: 500 });
      }
      return new Response(JSON.stringify({ message: 'Error signing up' }), { status: 500 });
    }

    // Revalidate the home page path and redirect
    revalidatePath("/");
    return redirect('/'); // Redirect to home page after successful OTP verification
  }

  return new Response(JSON.stringify({ message: 'OTP verification failed' }), { status: 400 });
}
