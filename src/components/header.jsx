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
    const user = false;
    return (
        <nav className='mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-4 text-white shadow-lg shadow-black/20 backdrop-blur-xl sm:px-6'>
            <Link to='/' className='logo'>
                <img src="logo url.png" className='max-w-15  max-h-13' alt="logoUrl" />
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
                            <DropdownMenuContent className="border border-white/10 bg-slate-950/95 text-white shadow-2xl shadow-black/40 backdrop-blur-xl" >
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
                ) : (<Button className=" p-6 rounded-full bg-amber-50 font-bold  text-black">login</Button>)
                }
            </div>

        </nav>
    )
}

export default Header
