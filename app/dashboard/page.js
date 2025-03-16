import { Suspense } from "react";
import {
  getCaseStats,
  getTodayCasesStats,
  getTomorrowCasesStats,
} from "@/lib/cases";
import { Mona_Sans } from "next/font/google";
import Card from "@/components/util/Card";

async function CaseStats() {
  const caseStats = await getCaseStats();
  const todayCaseStats = await getTodayCasesStats();
  const tomorrowCaseStats = await getTomorrowCasesStats();
  const active_cases =
    (caseStats.find((eachStatus) => eachStatus.case_status === "Active") || {})
      .case_count || 0;
  const closed_cases =
    (caseStats.find((eachStatus) => eachStatus.case_status === "Closed") || {})
      .case_count || 0;
  const today_cases = todayCaseStats[0] ? todayCaseStats[0].count : 0;
  const tomorrow_cases = tomorrowCaseStats[0] ? tomorrowCaseStats[0].count : 0;

  return (
    <div className="sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0 md:grid md:grid-cols-2 md:gap-2 md:px-2 lg:grid lg:grid-cols-4 lg:gap-4 lg:px-2 xl:grid xl:grid-cols-4 xl:gap-4 xl:px-2 justify-items-center">
      <Card variant="dashboardCard">
        <h2 className="text-base sm:text-xl ">Active Cases</h2>
        <p>{active_cases}</p>
        <p className="text-sm sm:mt-6 mt-2 text-white/80">
          You have {active_cases} total running cases
        </p>
      </Card>
      <Card variant="dashboardCard">
        <h2 className="text-base sm:text-xl ">Today's Cases</h2>
        <p>{today_cases}</p>
        <p className="text-sm sm:mt-6 mt-2 text-white/80">
          You have {today_cases} cases for hearing today
        </p>
      </Card>
      <Card variant="dashboardCard">
        <h2 className="text-base sm:text-xl ">Tomorrow's Cases</h2>
        <p>{tomorrow_cases}</p>
        <p className="text-sm sm:mt-6 mt-2 text-white/80">
          You have {tomorrow_cases} cases for hearing tomorrow
        </p>
      </Card>
      <Card variant="dashboardCard">
        <h2 className="text-base sm:text-xl ">Closed Cases</h2>
        <p>{closed_cases}</p>
        <p className="text-sm sm:mt-6 mt-2 text-white/80">
          You closed {closed_cases} cases. Woohoo!
        </p>
      </Card>
    </div>
  );
}

export default async function DashboardPage() {
  return (
    <>
      <div className=" bg-cover bg-[80%_60%] bg-hero-pattern sm:h-80 h-52 text-white flex ">
        <section className=" flex flex-row flex-1 w-full items-center text-center justify-center ">
          <div className="bg-black/40 flex flex-col p-3 ">
            <h1 className="text-white sm:text-lg text-base p-3 font-bold w-full leading-normal ">
              Legal Practice Management for Attorneys & Firms
            </h1>
            <p className=" sm:text-base text-sm px-3 rounded-md ">
              Designed to streamline case management, client details, and
              documents, all in one place.
            </p>
          </div>
        </section>
      </div>

      <div className="flex justify-center items-center gap-5 ">
        <Suspense
          fallback={
            <p className=" animate-loading text-lg text-center bg-gradient-to-r to-light_blue from-dark-blue bg-clip-text text-white/5 mt-20 ">
              Loading stats..
            </p>
          }
        >
          <CaseStats />
        </Suspense>
      </div>
    </>
  );
}
