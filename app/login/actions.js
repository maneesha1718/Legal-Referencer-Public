'use server'

import crypto from 'crypto';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { getURL } from '@/utils/helpers'

export async function login(prevState, formData) {

  const supabase = await createClient();
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    if(error.code == 'invalid_credentials'){
      redirect("/login?message=Invalid credentials");
    }
    redirect("/login?message=Could not authenticate user");
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup( formData) {

  let data = ''
  if(formData){
    data = {
    email: formData.get("email"),
    password: formData.get("password"),
    };
  }

  let errors = {};

  if (data.email && !data.email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if ( data.password && data.password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  return data;
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function oAuthSignIn(provider) {
  if (!provider) {
    return redirect('/login?message=No provider selected');
  }
  const redirectUrl = getURL('/auth/callback');

  const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) {
      //console.error('OAuth sign-in error:', error);
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect(data.url);
}

export async function passwordResetMail( formData) {

  let data = ''
  if(formData){
    data = {
    email: formData.get("email"),
    };
  }

  let errors = {};

  if (data.email && !data.email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  return data;
}

export async function passwordreset ({code, password}){

  let errors;

  const supabase = await createClient();
  const { data:sessionData , error:sessionError } = await supabase.auth.exchangeCodeForSession(code);
  
      if (sessionError) {
        console.error("Error creating session", sessionError);
        errors = 'Error creating session'
        return errors;
      }
  
      // Step 2: Update the password
      const { data, error } = await supabase.auth.updateUser({ password });
  
      if (error) {
        errors = 'Error updating Password'
        return errors;
      }

    else{
      redirect('/');
    }
}
