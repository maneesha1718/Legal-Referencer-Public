import { createClient } from '@/utils/supabase/server';

export async function POST(req) {

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405 });
  }

  const { email } = await req.json();

  const supabase = await createClient();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://www.legalreferencer.site/passwordReset'
  });
  
  if (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 400 });
  }

  return Response.json(data);
}
