'use client';

import { useFormStatus } from 'react-dom';
import Button from '../util/Button';

export default function CaseFormSubmit({type, buttonName}){

  const { pending } = useFormStatus();

  return(
    <Button type={type?type:'button'} disabled={pending} variant="formButton" >
      {pending ? 'Submitting...' : buttonName}
    </Button>
    
  )
}