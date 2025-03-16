'use client'
import { useState } from 'react';

import DownloadFile from '@/components/cases/downloadFile';
import CaseDelete from '@/components/cases/caseDelete';

export default function CaseFiles({case_docs, case_details_data, slug}){

  const [files, setFiles] = useState(case_docs); // State for storing files

  // Handler for deleting a file
  const handleFileDelete = async (deletedFile) => {
    setFiles(prevFiles => prevFiles.filter(file => file !== deletedFile));
  };

  return(
    <>   
      <ul className='p-3'>
        {files.map(document => (
        <li className='list-none flex gap-3 text-light_blue text-sm' key={document}>
          {document}
          <DownloadFile doc={document} owner={case_details_data.owner} case_no={case_details_data.case_no} slug={slug} />
          <CaseDelete className='size-4 text-blue' doc={document} owner={case_details_data.owner} case_no={case_details_data.case_no} onDelete={handleFileDelete} />
        </li>
        ))}
      </ul>
    </>
  )
}