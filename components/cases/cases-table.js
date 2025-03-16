import Link from "next/link";

import { TableHeader } from "../util/table";
import { TableBody } from "../util/table";
import CaseDelete from "./caseDelete";
import CaseEdit from "./caseEdit";

export default async function CasesTable({cases}) {

  if(cases.length<1){
    return(
      <main className=" mt-20 text-center ">
      <h1 className=" text-lg m-3 font-semibold text-white/5 bg-gradient-to-r to-light_blue from-dark-blue bg-clip-text bg-cover bg-center ">No data found</h1>
      <p className=" text-base font-normal " >0 cases returned</p>
    </main>
    )
  }

  const headers = Object.keys(cases[0]).filter(
    (key) => key !== "id" && key !== "slug" && key!== "owner",
  );
  

  return (
    <main className="mx-10 my-12 content-center">
      <div className="overflow-auto md:overflow-auto" >
      <table className="border-tableBorder xl:min-w-[1180px] table-auto border-collapse border-spacing-0.5">
        <thead>
          <tr className="bg-button_light/90">
            {headers.map((header) => (
              <TableHeader key={header}>
                {header.replace("_", " ").toUpperCase()}
              </TableHeader>
            ))}
            <TableHeader />
            <TableHeader />
          </tr>
        </thead>

        <tbody>
          {cases.map((caseItem) => (
            <tr key={caseItem.id} className="hover:bg-row_hover" >

              {headers.map((header) => (
                <TableBody key={header}>
                  {header === "case_no" ? (
                    <div className="text-blue">
                      <Link
                        href={`/cases/${caseItem.slug}`}
                        className="hover:text-dark-blue"
                      >
                        {caseItem.case_no}
                      </Link>
                    </div>
                  ) : (
                    !caseItem[header]?<p>-</p>:
                    <div>{caseItem[header]}</div>
                  )}
                </TableBody>
              ))}

              <TableBody>
                <CaseEdit slug={caseItem.slug} />
              </TableBody>
              <TableBody>
                <CaseDelete id={caseItem.id} />
              </TableBody>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </main>
  );
}
