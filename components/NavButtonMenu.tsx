import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


type Props = {
    icon : LucideIcon,
    label : string,
    choises : {
        title : string,
        href: string,
    }[]
}

export function NavButtonMenu({
    icon : Icon,
    label,
    choises,
} : Props){
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Icon className="h-[1.2rem] w-[1.2rem]"/>
                    <span className="sr-only">{label}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {choises.map(choise => (
                    <DropdownMenuItem key={choise.title}>
                        <Link href={choise.href}>{choise.title}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}