"use client"
import { HomeIcon, File, UsersRound , LogOut} from "lucide-react";
import NavButton from "./NavButton";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "./ui/button";
import { createContext } from 'react';
import { NavButtonMenu } from "./NavButtonMenu";

export const MyContext = createContext({ someValue: 'default' });

function Header() {
    return ( 
        <header className="animate-slide bg-background h-14 mb-2 p-2 border-b sticky top-0 z-20">
            <div className="flex h-8 items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    <NavButton href="/tickets" label="Home" icon={HomeIcon}/>
                    <Link href="/tickets" className="flex justify-center items-center gap-2 ml-0" title="Home">
                        <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">
                            Computer Repair Shop
                        </h1>
                    </Link>
                </div>
                <div className="flex items-center">
                    <NavButton href="/tickets" label="Tickets" icon={File}/>
                    <NavButtonMenu icon={UsersRound} label="Custmers menu" choises={[
                        { title : "Search Customers", href:"/customers"},
                        { title : "New Customer", href:"/customers/form"},
                    ]}/>
                    <ModeToggle/>
                    <Button variant="ghost" size="icon" aria-label="logOut" title="logOut" className="rounded-full" asChild>
                        <LogoutLink><LogOut/></LogoutLink>
                    </Button>
                </div>
            </div>
        </header>
     );
}

export default Header;