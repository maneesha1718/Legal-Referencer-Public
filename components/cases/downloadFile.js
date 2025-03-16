'use client';
import { useRouter } from 'next/navigation';
import { ArrowDownToLine } from 'lucide-react';

import {getFileUrl} from '@/lib/cases';

export default function DownloadFile({doc, owner, case_no, slug}){

  const handleFileDownload = async () => {
    try {
      const fileUrl = await getFileUrl(owner, case_no, doc);
      if (fileUrl?.publicUrl) {
        if (typeof window !== 'undefined' && document) {
          const a = document.createElement('a');
          a.href = fileUrl.publicUrl;
          a.download = doc;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      } else {
        console.error('File URL is undefined');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return(
    <>
    <div >
      <ArrowDownToLine className=' size-4 cursor-pointer text-blue '
        onClick={handleFileDownload}
      />
      
    </div>
    </>
    
  );
  
}