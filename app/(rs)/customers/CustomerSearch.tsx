import SearchButton from "@/components/SearchButton";
import Form from "next/form";
import { Input } from "@/components/ui/input";


const CustomerSearch = () => {

  return (
    <Form action="/customers" className="flex gap-2 items-center">
        <Input name="searchText" type="text" placeholder="Search Customers" className="w-full"/>
        <SearchButton/>
    </Form>
  )
}

export default CustomerSearch
