import { Suspense } from "react";

import { getCases } from "@/lib/cases";
import CasesTable from "@/components/cases/cases-table";

async function Cases(){
  const cases = await getCases();
  return <CasesTable cases={cases}/>
}

export default function CasesPage() {

  return (
    <>
      <header className=" w-4/5 max-w-4xl text-2xl mt-12 mb-12 mx-10 ">
        <h1>Cases Data</h1>
      </header>
    
      <Suspense fallback={<p className="animate-loading text-lg text-center bg-gradient-to-r to-light_blue from-dark-blue bg-clip-text text-white/5 mt-20 ">Loading cases..</p>} >
        <Cases/>
      </Suspense>
    </>
  );
}
