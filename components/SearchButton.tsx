"use client"

import { useFormStatus } from "react-dom"
import { LoaderCircle } from "lucide-react"
import { Button } from "./ui/button"


export default function SearchButton(){
    const status = useFormStatus();

    return (
        <Button className="w-20" type="submit" disabled={status.pending}>
            {
                status.pending ? (
                    <LoaderCircle className="animate-spin"/>
                ) : "Search"
            }
        </Button>
    )
}