'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import Input from '../util/Input';
import SearchDateInput from "@/components/util/SearchDateInput";
import CaseFormSubmit from "@/components/util/case-form-submit";

export default function CaseSearch(){

  const router = useRouter();
  const [formData, setFormData] = useState({
    case_no: '',
    year: '',
    court: '',
    case_status: '',
    next_date: '',
    prev_date: '',
    first_party: '',
    opposite_party: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSearch = (event) => {
    event.preventDefault();
    const finalSearchFields = Object.entries(formData).reduce((acc,[key, val]) => { 
      if (val) acc[key] = val;
      return acc;
    }, {});
    
    const queryString = new URLSearchParams(finalSearchFields).toString();
    router.push(`/search?${queryString}`)
  };

  return(
    <section className=" content-center mx-10 my-12 " >
          <form onSubmit={onSearch} >
            <div className=" grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-1 ">
              <Input variant="searchCase" name="case_no" type="text" placeholder="Case No." value={formData.case_no} onChange={handleInputChange} />
              <Input variant="searchCase" name="year" type="number" placeholder="Year" value={formData.year} onChange={handleInputChange} />
              <Input variant="searchCase" name="court" type="text" placeholder="Court" value={formData.court} onChange={handleInputChange} />
              <select className="mb-3 text-form-text border border-tableHeader-lgray rounded-md " name="case_status" id="status" value={formData.case_status} onChange={handleInputChange} >
                <option value="" disabled>Case status</option>
                <option className="text-form-text" value="Active">Active</option>
                <option className="text-form-text" value="Closed">Closed</option>
                <option className="text-form-text" value="Abandoned">Abandoned</option>
                <option className="text-form-text" value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className=" grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-1 ">
              <SearchDateInput name="next_date" placeholder="Next Date" value={formData.next_date} onChange={handleInputChange} />
              <SearchDateInput name="prev_date" placeholder="Prev Date" value={formData.prev_date} onChange={handleInputChange} />
              <Input variant="searchCase" name="first_party" type="text" placeholder="First Party" value={formData.first_party} onChange={handleInputChange} />
              <Input variant="searchCase" name="opposite_party" type="text" placeholder="Opposite Party" value={formData.opposite_party} onChange={handleInputChange} />
            </div>

            <p className=" text-right " >
            <CaseFormSubmit type="submit" buttonName='Search Case' />
            </p>
          </form>
    </section>
  );
}