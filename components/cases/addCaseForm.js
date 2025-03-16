'use client';

import { notFound } from 'next/navigation';
import { useState } from 'react';

import CaseFormSubmit from "@/components/util/case-form-submit";
import Input from "@/components/util/Input";
import FilePicker from "@/components/util/FilePicker";
import { updateCase } from "@/lib/actions";
import CaseFiles from '@/components/cases/caseFiles';
import CaseNo from '@/components/util/CaseNo';

export default function AddCaseForm({ slug, existingCase, case_details }) {
  const [formState, setFormState] = useState({
    errors: {},
  });
  const [fileError, setFileError] = useState("");
  const [dateError, setDateError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  let updateExistingCase;
  let newCase;
  let case_details_data = '';
  let case_docs = '';

  if (slug) {
    case_details_data = case_details.data[0];
    case_docs = case_details.docs.map(item => item.name);

    if (!case_details_data) {
      notFound();
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setFileError(""); // Clear previous file errors
    setDateError("");

    const formData = new FormData(e.target);
    const documents = formData.getAll("documents");
    const formDataObj = Object.fromEntries(formData.entries());

    const prevDate = new Date(formDataObj.prevDate);
    const nextDate = new Date(formDataObj.nextDate);

    if (prevDate && nextDate && prevDate > nextDate) {
      setDateError("Previous Hearing Date must be before Next Hearing Date.");
      return; // Stop submission if validation fails
    }

    // Check file size before sending
    const maxSize = 1 * 1024 * 1024; // 1MB in bytes
    const oversizedFiles = documents.filter(file => file.size > maxSize);

    if (oversizedFiles.length > 0) {
      setFileError(`The following files exceed 1MB: ${oversizedFiles.map(f => f.name).join(", ")}`);
      return; // Stop submission if there's an error
    }

    if (slug) {
      updateExistingCase = await updateCase(existingCase.id, formDataObj, documents);
    } else {
      newCase = await updateCase(null, formDataObj, documents); // For new case submission
    }

    if (updateExistingCase) {
      setFormState({
        errors: updateExistingCase.errors,
      });
    }
    if (newCase) {
      setFormState({
        errors: newCase.errors,
      });
    }
  };

  return (
    <main className="w-4/5 max-w-4xl mx-10 my-12">
      <form className="max-w-2xl" onSubmit={handleFormSubmit}>
      {
        formState.errors.user && <p className="text-red text-sm font-normal mb-2">{formState.errors.user}</p>}
        <CaseNo enteredCaseNo={case_details_data && case_details_data.case_no} />{
        formState.errors.caseNo && <p className="text-red text-sm font-normal mb-2">{formState.errors.caseNo}</p>}
        <Input variant="addCase" name="year" type="number" label="Year *" defaultValue={case_details_data && case_details_data.year} required />
        <Input variant="addCase" name="court" type="text" label="Court *" defaultValue={case_details_data && case_details_data.court} required />
        <Input variant="addCase" className="flex w-auto" name="prevDate" type="date" label="Previous Hearing Date" disabled={isDisabled} defaultValue={case_details_data && case_details_data.prev_date} min="1990-01-01" max="2030-12-31" />
        {
        formState.errors.prevDate && <p className="text-red text-sm font-normal mb-2">{formState.errors.prevDate}</p>}
        <div className='mb-4 text-sm' >
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="disableInput"
            onChange={() => setIsDisabled(!isDisabled)}
          />
          <span >Is it a New case?</span>
        </label>
        </div>
        {dateError && <p className="text-red text-sm font-normal mb-2">{dateError}</p>}
        <Input variant="addCase" className="flex w-auto" name="nextDate" type="date" label="Next Hearing Date" defaultValue={case_details_data && case_details_data.next_date} min="1990-01-01" max="2030-12-31" />
        <Input variant="addCase" name="firstParty" type="text" label="First Party *" defaultValue={case_details_data && case_details_data.first_party} required />
        <Input 
          variant="addCase" 
          name="contact" 
          type="text" 
          label="Contact Details *" 
          defaultValue={case_details_data && case_details_data.contact} 
          required 
          onInput={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-digits
            e.target.value = value.slice(0, 10); // Limit to 10 digits
          }}  
        />
        <Input variant="addCase" name="oppositeParty" type="text" label="Opposite Party *" defaultValue={case_details_data && case_details_data.opposite_party} required />
        <p>
          <label htmlFor="status" className="block transform uppercase text-form-label mb-0.5 text-sm">Case status *</label>
          <select className="mb-3 border border-solid border-form-label/50 rounded-sm text-form-text bg-white" name="caseStatus" id="status" defaultValue={case_details_data && case_details_data.case_status}>
            <option className="text-form-text bg-white" value="Active">Active</option>
            <option className="text-form-text" value="Closed">Closed</option>
            <option className="text-form-text" value="Abandoned">Abandoned</option>
            <option className="text-form-text" value="Cancelled">Cancelled</option>
          </select>
        </p>
        
        <FilePicker name="documents" type="file" label="Attach documents" />

        {case_docs && case_details_data && case_details_data.owner && case_details_data.case_no && (
          <CaseFiles case_docs={case_docs} case_details_data={case_details_data} slug={slug} />
        )}
        <p className=' text-tableBorder-dgray text-sm '>*Max file upload size is 1mb</p>
        {fileError && <p className="text-red text-sm font-normal mb-2">{fileError}</p>}
        {
        formState.errors.docs && <p className="text-red text-sm font-normal mb-2">{formState.errors.docs}</p>}

        <p className="text-right">
          <CaseFormSubmit type="submit" buttonName={slug ? 'Update case' : 'Add case'} />
        </p>
      </form>
    </main>
  );
}
