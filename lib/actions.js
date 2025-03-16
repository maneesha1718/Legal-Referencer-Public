//why in a different file? earlier this was in add-case/page,js file but with that if we define it as a client component with 'use client'? then nextJS build process might not be able to seperate both of it clearly and chances that server code might accidentally end up on client side which might lead to security issues

'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import slugify from 'slugify';

import { findCase } from "./cases";
import { revalidatePath } from 'next/cache';

export async function updateCase(existingCaseId, formData, documents) {

  let errors = {};

  const case_data = {
    case_no: formData.caseNo,
    year: formData.year,
    court: formData.court,
    prev_date: formData.disableInput ? null : formData.prevDate,
    next_date: formData.nextDate,
    first_party: formData.firstParty,
    contact: formData.contact,
    opposite_party: formData.oppositeParty,
    case_status: formData.caseStatus,
  };

  case_data.slug = slugify([case_data.case_no,case_data.first_party].toString(), { lower: true });

  const supabase = await createClient();
  const {data: {user}, error: userError} = await supabase.auth.getUser();
  
  if (userError) {
    errors.user = 'User Error occurred';
    throw new Error(`Error fetching user: ${userError.message}`);
  }

  if (!user) {
    errors.user = 'User is not logged in';
    throw new Error("User is not logged in");
  }

  if(existingCaseId){
    const {error: dataError} = await supabase.from("cases").update({
      slug: case_data.slug,
      owner: user.id,
      case_no: case_data.case_no,
      year: case_data.year,
      court: case_data.court,
      prev_date: case_data.prev_date,
      next_date: case_data.next_date,
      first_party: case_data.first_party,
      contact: case_data.contact,
      opposite_party: case_data.opposite_party,
      case_status: case_data.case_status,
    }).eq('id', existingCaseId);

    for (const document of documents) {
      if(document.size>0){
        const file_name = document.name;  // The file name from the document array
        const file = document;

        const cleaned_case_no = case_data.case_no.replaceAll('/','')
        const {error: docsError} = await supabase.storage.from('case_documents').upload(user.id+"/"+cleaned_case_no+"/"+file_name,file);

        if (docsError) {
          errors.docsError = 'Error updating documents'
          throw new Error("Error updating documents")
        }
      }
    }
    if(dataError){
      if(dataError.message == 'duplicate key value violates unique constraint "cases_caseno_key"'){
        errors.caseNo = 'Case No should be unique. Please verify!'
      }
      if(dataError.message == 'invalid input syntax for type date: ""'){
        errors.prevDate = 'Please enter previous hearing date'
      }
      else{
        errors.dataerror = dataError.message
      }
    }
  }

  if(!existingCaseId){
    const {error: dataError} = await supabase.from("cases").insert({
    slug: case_data.slug,
    owner: user.id,
    case_no: case_data.case_no,
    year: case_data.year,
    court: case_data.court,
    prev_date: case_data.prev_date,
    next_date: case_data.next_date,
    first_party: case_data.first_party,
    contact: case_data.contact,
    opposite_party: case_data.opposite_party,
    case_status: case_data.case_status,
  });
  for (const document of documents) {
    if(document.size>0){
      const file_name = document.name;  // The file name from the document array
      const file = document;

      const cleaned_case_no = case_data.case_no.replaceAll('/','')
      const {error: docsError} = await supabase.storage.from('case_documents').upload(user.id+"/"+cleaned_case_no+"/"+file_name,file);

      if (docsError) {
        errors.docsError='Error Adding documents'
        throw new Error("Error Adding documents")
      }
    }
  }

  
  if(dataError){
    if(dataError.message == 'duplicate key value violates unique constraint "cases_caseno_key"'){
      errors.caseNo = 'Case No should be unique. Please verify!'
    }

    if(dataError.message == 'invalid input syntax for type date: ""'){
      errors.prevDate = 'Please enter previous hearing date'
    }
  }
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  else{
    revalidatePath('/', 'layout');
    redirect('/cases');
  }
}

export async function searchCase(searchEntries) {

  const finalSearchFields = Object.entries(searchEntries).reduce((acc,[key, val]) => { 
    if (val) acc[key] = val;
    return acc;
  }, {})

  await findCase(finalSearchFields);
}

export async function deleteCase(id){

  const supabase = await createClient();
  const {data: {user} , error: userError} = await supabase.auth.getUser();

  if (userError) {
    throw new Error(`Error fetching user: ${userError.message}`);
  }

  if (!user) {
    throw new Error("User is not logged in");
  }

  const { error } = await supabase.from("cases").delete().match({
    owner: user.id,
    id: id,
  })

  if(error){
    throw new Error("Error deleting case")
  }
  revalidatePath('/cases');
}

export async function deleteDocs(owner, case_no, doc){
  
  const cleaned_case_no = case_no.replaceAll('/','')
  const file_path = `${owner}/${cleaned_case_no}/${doc}`;
  
  const supabase = await createClient();
  const { data, error } = await supabase
    .storage
    .from('case_documents')
    .remove([file_path]);

  if (error) {
    console.error('Error deleting file:', error.message);
    return { success: false, message: error.message };
  }

  return { success: true, message: 'File deleted successfully' };

}

export async function fileUrl(owner, document, case_no){

  const cleaned_case_no = case_no.replaceAll('/','')
  const supabase = await createClient();
  const { data, error } = await supabase
  .storage
  .from('case_documents')
  .getPublicUrl(owner+'/'+cleaned_case_no+'/'+document);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}