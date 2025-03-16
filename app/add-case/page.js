import AddCaseForm from '@/components/cases/addCaseForm';
import { getCaseDetails, getCaseId } from "@/lib/cases";

export default async function AddCasePage({searchParams}) {

  let existingCase = '';
  let case_details = '';

  const { slug } = await searchParams;
  if(slug){
    existingCase = await getCaseId(slug);
    case_details = await getCaseDetails(slug);
  }
  

  return(
    <>
    <header className=" w-4/5 max-w-4xl text-2xl text-gray-600 mt-12 mb-12 mx-10 ">
        <h1>{slug ? 'Update case details' : 'Add case details'}</h1>
      </header>
      <AddCaseForm slug={slug} existingCase={existingCase} case_details={case_details} />
    </>
    
  )
  
}
