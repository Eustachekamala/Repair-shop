import SearchButton from "@/components/SearchButton";
import Form from "next/form";
import { Input } from "@/components/ui/input";

const  TicketSearch = () => {
    return (
    <Form action="/tickets" className="flex gap-2 items-center">
        <Input name="searchText" type="text" placeholder="Search ticket" className="w-full"/>
        <SearchButton/>
    </Form>
  )
}

export default TicketSearch