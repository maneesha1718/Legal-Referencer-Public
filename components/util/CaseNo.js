"use client";
import { useState } from "react";

import Input from "@/components/util/Input";

export default function CaseNo({ enteredCaseNo }) {
  const [caseNo, setCaseNo] = useState('');
  const [confirmCaseNo, setConfirmCaseNo] = useState("");
  const [caseNoError, setCaseNoError] = useState("");

  const handleCaseNoChange = (e) => {
    setCaseNo(e.target.value);
    if (confirmCaseNo && e.target.value !== confirmCaseNo) {
      setCaseNoError("CaseNo's do not match");
    } else {
      setCaseNoError("");
    }
  };

  const handleConfirmCaseNoChange = (e) => {
    setConfirmCaseNo(e.target.value);
    if (caseNo) {
      if (caseNo && e.target.value !== caseNo) {
        setCaseNoError("CaseNo's do not match");
      } else {
        setCaseNoError("");
      }
    } else {
      if (enteredCaseNo && e.target.value !== enteredCaseNo) {
        setCaseNoError("CaseNo's do not match");
      } else {
        setCaseNoError("");
      }
    }
  };

  return (
    <>
      <div className="lg:flex lg:flex-row xl:flex-row md:flex  sm:flex sm:flex-col gap-4 mb-3">
        {/* Ensure the inputs have a width that allows them to fit in a row */}
        <Input
          variant="addCase"
          className="flex w-full md:w-1/2" // Use w-full to make them take up full width on smaller screens and 1/2 width on medium and above
          name="caseNo"
          type="text"
          label="Case No. *"
          defaultValue={enteredCaseNo}
          onChange={handleCaseNoChange}
          required
        />
        <Input
          variant="addCase"
          className="flex w-full md:w-1/2" // Same here
          type="text"
          label="Confirm Case No. *"
          value={confirmCaseNo}
          onChange={handleConfirmCaseNoChange}
          required
        />
      </div>
      {caseNoError && (
        <div className="text-red text-sm font-normal">
          {caseNoError}
        </div>
      )}
    </>
  );
}
