'use server';
import { notFound } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

//to get all cases from db
export async function getCases(){
  //establish database connection
  const supabase = await createClient();
  const cases = await supabase.from("cases").select();
  return cases.data;
}

export async function getCaseDetails(slug){
  const supabase = await createClient();
  const { data, error } = await supabase.from('cases').select('*').eq('slug', slug);// Filter by slug

  if(data.length === 0){
    notFound();
  }

  if (error) {
    throw new Error(error.message);
  }
  
  const user_id = data[0].owner;
  const case_no = data[0].case_no.replaceAll('/','');

  const {data:docs, error: docsError} = await supabase.storage.from('case_documents').list(user_id+'/'+case_no+'/',{limit: 10});

  if(docsError){
    throw new Error(docsError.message);
  }

  return {data, docs};
}

export async function getCaseStats(){
  //establish database connection
const supabase = await createClient();
  const case_stats = await supabase.rpc('get_case_counts');
  return case_stats.data;
}

export async function getTodayCasesStats(){
  //establish database connection
const supabase = await createClient();
  const today_case_stats = await supabase.rpc('count_cases_today');
  return today_case_stats.data;
}

export async function getTomorrowCasesStats(){
  //establish database connection
const supabase = await createClient();
  const tomorrow_case_stats = await supabase.rpc('count_cases_tomorrow');
  return tomorrow_case_stats.data;
}

export async function getCaseId(slug){
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('cases')
    .select('id')
    .eq('slug', slug)
    .single();
    
    if (error) {
      return `Error: ${error.message}`;
    }
    
    // Check if no row or multiple rows returned
    if (!data) {
      return 'No case found with the given slug.';
    }
    return data;
}

export async function findCase(searchFields){

  const supabase = await createClient();
  let query = supabase.from('cases').select('*');

  if (searchFields && Object.keys(searchFields).length > 0) {
    Object.keys(searchFields).forEach((key) => {
      if (searchFields[key]) {
        const value = searchFields[key]
        if (typeof value === 'string') {
          // If it's a string, check if it's a valid date in the format yyyy-mm-dd
          if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
            // Treat it as a date and use eq for exact match
            query = query.eq(key, value);
          } else {
            // Otherwise, treat it as a regular string and use ilike for partial matching
            query = query.ilike(key, value);
          }}
        else if (typeof searchFields[key] === 'number') {
          query = query.eq(key, searchFields[key]);
        }
        else if (value instanceof Date) {
          // Handle Date fields directly
          query = query.eq(key, value.toISOString().split('T')[0]); // Convert to yyyy-mm-dd format
        }
      }
    });
  }

  else {
    query = query.limit(0);
  }

  const { data, error } = await query
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getFileUrl(owner, case_no, document){

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

export async function toDownloadFile(fileUrl, file){

  if (!fileUrl) {
    console.error('File URL is undefined')
    return
  }
  const a = document.createElement('a');
  a.href = fileUrl;
  a.download = {file};  // Set the filename here
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function getCasesByDate(){
  const supabase = await createClient();
  const {data, error} = await supabase.rpc('get_cases_by_date');

  return data;
}