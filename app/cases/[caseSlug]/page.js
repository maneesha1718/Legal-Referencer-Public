'use server';

import { notFound } from 'next/navigation';

import { getCaseDetails } from "@/lib/cases";
import DownloadFile from '@/components/cases/downloadFile';

export default async function CaseDetailPage( searchParams ) {

  const searchParam = await searchParams;

  const { caseSlug } = await searchParam.params;
  const case_details = await getCaseDetails(caseSlug);

  const documents = case_details.docs.map(item => item.name);
  const cleaned_case_details = case_details.data[0];

  if (!cleaned_case_details) {
    notFound();
  }

  return (
    <>
      <header className= " m-5 text-center ">
        <div className="m-1 flex justify-center items-center ">
          <h2 className="text-xl text-dark-blue mr-4 ">
            {cleaned_case_details.case_no}
          </h2>
        </div>
        <div className=" flex justify-center gap-1 text-lg text-blue">
          <p>{cleaned_case_details.first_party}</p>
          <p className="text-dark-blue/80">v/s</p> 
          <p>{cleaned_case_details.opposite_party}</p>
        </div>
      </header>

      <section className='m-10' >
        <p className=' text-lg text-blue '>{cleaned_case_details.case_status}</p>
          <div className=' grid grid-cols-[20%80%] mb-1 ' >
            <p className=" text-form-label ">Year</p>
            <p className="">{cleaned_case_details.year} </p>
          </div>
          <div className=' grid grid-cols-[20%80%] mb-1 '>
            <p className="text-form-label ">Court Name</p>
            <p className=" ">{cleaned_case_details.court} </p>
          </div>
          <div className=' grid grid-cols-[20%80%] mb-1 '>
            <p className="text-form-label ">Next hearing</p>
            <p className=" ">{cleaned_case_details.next_date} </p>
          </div>

          <div className=' grid grid-cols-[20%80%] mb-1 '>
            <p className="text-form-label ">First Party</p>
            <p className=" ">{cleaned_case_details.first_party} </p>
          </div>
        
          <div className=' grid grid-cols-[20%_80%] mb-1 '>
            <p className="text-form-label ">Contact details</p>
            <p className=" ">{cleaned_case_details.contact} </p>
          </div>
          
          <div className=' grid grid-cols-[20%80%] mb-1 '>
            <p className="text-form-label ">Opposite Party</p>
            <p className=" ">{cleaned_case_details.opposite_party} </p>
          </div>
          
          <div className=' grid grid-cols-[20%80%] mb-1 mt-4 '>
            <p className="text-form-label ">Documents</p>
            <ul>
            {documents.map(document => <li className=' list-none flex gap-3 text-light_blue text-sm ' key={document}>{document}
              
              <DownloadFile doc={document} owner={cleaned_case_details.owner} case_no={cleaned_case_details.case_no} slug={caseSlug} />
            </li>)
            }
            </ul>
          </div>
      </section>
    </>
  );
}
