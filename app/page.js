import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import Dashboard from "./dashboard/page";
import LandingPage from "@/components/Landing";

export default async function Home({searchParams}) {

  const {mode} = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user){
    return(
        <LandingPage/>
    )
  }

  return (
    <main>
      <Dashboard/>
    </main>
  );
}
