import CasesCalendar from "@/components/cases/casesCalendar";
import { getCasesByDate } from "../../lib/cases";

export default async function CalendarPage() {

  const casesByDate = await getCasesByDate();

  return (
    <>
       <CasesCalendar casesOnDate={casesByDate}/>
    </>
  );
}
