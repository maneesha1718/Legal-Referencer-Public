'use client';

import { useFormStatus } from 'react-dom';
import Button from '../util/Button';

export default function CaseFormSubmit({type, buttonName}){

  const { pending } = useFormStatus();

  return(
    <button type={type?type:'submit'} disabled={pending} className="text-white bg-gradient-to-r to-light_blue from-dark_blue cursor-pointer text-base px-3 py-1 rounded-sm border-0 border-none hover:opacity-70 hover:font-bold">
      {pending ? 'Submitting...' : buttonName}
    </button>
    
  )
}