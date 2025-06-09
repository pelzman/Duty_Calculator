// src/components/Header.tsx
// import { Avatar } from "@/components/ui/avatar"
import Logo from "@/assets/icons/logo.svg?react"

export function Header() {
    return (
        <header className=" md:w-full flex justify-between items-center bg-[#0095DA] text-white  px-6 md:px-12 py-2 ">
            <div className="flex items-center gap-3">
                <Logo className="h-6 w-6 md:h-8 md:w-8" />
            </div>
        </header>
    )
}
