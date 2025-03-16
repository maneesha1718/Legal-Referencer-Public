import { findCase } from "@/lib/cases";

import CaseSearch from '@/components/cases/caseSearch';
import CasesTable from '@/components/cases/cases-table';

export default async function SearchPage({ searchParams }) {
  const { case_no, year, court, case_status, next_date, prev_date, first_party, opposite_party } = searchParams;
  
  // Only proceed if at least one search field is filled
  const hasSearchParams = Object.values(searchParams).some((val) => val);
  
  let cases = [];
  if (hasSearchParams) {
    const params = {
      case_no,
      year: year ? parseInt(year) : undefined, // Ensure it's a number
      court,
      case_status,
      next_date,
      prev_date,
      first_party,
      opposite_party
    };

    const finalSearchFields = Object.fromEntries(
      Object.entries(params).filter(([_, val]) => val) // Remove empty fields
    );

    cases = await findCase(finalSearchFields);
  }

  return (
    <>
      <header className="w-4/5 max-w-4xl text-2xl text-gray-600 mt-12 mb-12 mx-10">
        <h1>Search Case</h1>
      </header>

      <CaseSearch />

      <section>
        <CasesTable cases={cases} />
      </section>
    </>
  );
}
