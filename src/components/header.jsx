import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    CreditCardIcon,
    LinkIcon,
    LogOutIcon,
    SettingsIcon,
    UserIcon,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem ,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
function Header() {
    const user = true;
    return (
        <nav className='flex justify-between items-center mx-10 py-4 px-6 bg-[#030712] text-white'>
            <Link to='/' className='logo'>
                <img src="url_shortener_logo.png" className='max-w-15  max-h-13' alt="logoUrl" />
            </Link>

            <div className="flex gap-2  justify-end items-center">
                {user ? (
                    <DropdownMenu  >
                        <DropdownMenuTrigger className="rounded-full p-0 bg-transparent border-0 cursor-pointer">
                            <Avatar className='w-10 h-10'>
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                    className="grayscale "
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-[#030712] border border-white" >
                            <DropdownMenuItem  className="text-white">
                                <UserIcon />
                                Profile
                            </DropdownMenuItem >
                            <DropdownMenuItem className="text-white" >
                                <LinkIcon />
                                My Links
                            </DropdownMenuItem >
                            <DropdownMenuItem className="text-white">
                                <SettingsIcon />
                                Settings
                            </DropdownMenuItem >
                            <DropdownMenuSeparator />
                            <DropdownMenuItem  variant="destructive">
                                <LogOutIcon />
                                Log out
                            </DropdownMenuItem >
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (<Button className="rounded-full bg-amber-50 font-bold text-black">login</Button>)
                }
            </div>

        </nav>
    )
}

export default Header
