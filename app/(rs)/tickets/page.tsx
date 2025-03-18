
import { getOpenTicket } from "@/lib/queries/getOpenTicket";
import { getTicketSearchResult } from "@/lib/queries/getTicketSearchResult";
import TicketSearch from "./TicketSearch"
import TicketTable from "./TicketTable";

export const metadata = {
    title : "Ticket Search",
}

async function Tickets({searchParams,} : {searchParams : Promise<{[key : string] : string | undefined}>}){
  const { searchText } =  await searchParams;
  if(!searchText) {
    const results = await getOpenTicket()
    return (
    <>
      <TicketSearch/>
      {results.length ? <TicketTable data={results}/> : <p className="mt-4"> No open Ticket found </p>}
    </>
  )}

  // query search result in the database
    const results = await getTicketSearchResult(searchText)

  return (
    <>
      <TicketSearch />
     {results.length ? <TicketTable data={results}/> : <p className="mt-4"> No results found </p>}
    </>
  )
}

export default Tickets