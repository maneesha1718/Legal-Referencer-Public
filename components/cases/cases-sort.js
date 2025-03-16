//Cracked code

'use client';
import React from "react";

import { TableHeader } from "../util/table";
import { TableBody } from "../util/table";

 export default function CasesSort ({cases}) {

  return(
    <table className=" table-auto border-tableBorder border-spacing-0.5 border-collapse " >
      <thead>
        <tr className=" text-white bg-tableHeader-lgray ">
          <TableHeader header='Case No.' />
          <TableHeader header='Year' />
          <TableHeader header='Prev Date' />
          <TableHeader header='Next Date' />
          <TableHeader header='Court' />
          <TableHeader header='First Party' />
          <TableHeader header='Contact' />
          <TableHeader header='Opposite Party' />
          <TableHeader header='Case Status' />
        </tr>
      </thead>
      <tbody>
        {cases.map((casee) => (
          <tr className=" hover:bg-row_hover" key={casee.caseNo}>
            <TableBody field={casee.caseNo}   />
            <TableBody field={casee.year} />
            <TableBody field={casee.prevDate} />
            <TableBody field={casee.nextDate} />
            <TableBody field={casee.court} />
            <TableBody field={casee.firstParty} />
            <TableBody field={casee.contact} />
            <TableBody field={casee.oppositeParty} />
            <TableBody field={casee.caseStatus} />
          </tr>
        ))}
      </tbody>
    </table>
  )
}