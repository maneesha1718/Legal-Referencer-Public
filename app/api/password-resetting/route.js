// app/api/reset-password/route.js
import { createClient } from '@/utils/supabase/server';

export async function POST(req) {

  const { password } = await req.json();
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({ message: 'Missing access token' }), { status: 401 });
  }

  const accessToken = authHeader.replace('Bearer ', ''); // Extract token

  // Create a Supabase client with the user's token
  const supabase = createClient();
  supabase.auth.setSession({ access_token: accessToken, refresh_token: '' });

  // Update the user’s password
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ message: 'Password updated successfully' }), { status: 200 });
}
