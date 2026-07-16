import { Link, useNavigate } from 'react-router-dom'
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
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UrlState } from '@/context'
import { logOut } from '@/db/apiAuth'


function Header() {
    const navigate = useNavigate()
    const { user } = UrlState()

    const handleLogin = () => {
        navigate('/auth?mode=login')
    }
    const handleLogout = async () => {
        try {
            await logOut()

            navigate('/')

        } catch (error) {
            console.error(
                'Error occurred while logging out:',
                error.message
            )
        }
    }


    return (
        <nav className='mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-4 text-white shadow-lg shadow-black/20 backdrop-blur-xl sm:px-6'>
            <Link to='/' className='logo'>
                <img src="/logo url.png" className='w-10 h-10 sm:w-12 sm:h-12' alt="logoUrl" />
            </Link>

            <div className="flex gap-2  justify-end items-center">
                {user ? (
                    <DropdownMenu  >
                        <DropdownMenuTrigger className="rounded-full p-0 bg-transparent border-0 cursor-pointer">
                            <Avatar className='w-10 h-10'>
                                <AvatarImage
                                    src={
                                        user?.user_metadata?.profile_pic ||
                                        "https://github.com/shadcn.png"
                                    }
                                    alt="@shadcn"
                                    className="grayscale "
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="border border-white/10 bg-slate-950/95 text-white shadow-2xl shadow-black/40 backdrop-blur-xl" >
                            <DropdownMenuItem className="text-white">
                                <UserIcon />
                                Profile
                            </DropdownMenuItem >
                            <DropdownMenuItem onClick={() => navigate('/dashboard')} className="text-white" >
                                <LinkIcon />
                                My Links
                            </DropdownMenuItem >
                            
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={handleLogout}
                            >
                                <LogOutIcon />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (<Button onClick={() => { handleLogin() }} className="rounded-full bg-amber-50 px-4 py-2 font-bold text-black sm:p-6" >login</Button>)
                }
            </div>

        </nav>
    )
}

export default Header
