
import { getOpenTicket } from "@/lib/queries/getOpenTicket";
import { getTicketSearchResult } from "@/lib/queries/getTicketSearchResult";
import TicketSearch from "./TicketSearch"

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
      <p>{JSON.stringify(results)}</p>
    </>
  )}

  // query search result in the database
    const results = await getTicketSearchResult(searchText)

  return (
    <>
      <TicketSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  )
}

export default Tickets