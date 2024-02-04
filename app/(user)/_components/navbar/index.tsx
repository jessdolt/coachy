"use client"
import React, { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@/types"
import { Button } from "@/components/ui/button"
import { Menu, User as UserIcon } from "lucide-react"
import SidebarDrawer from "../sidebar/sidebar-drawer"

interface NavbarProps {
  currentUser: User
}

const toInitials = (name: string) => {
  return name.substring(0, 1)
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false)

  if (!currentUser) return null

  const initials = `${toInitials(currentUser.firstName)}${toInitials(
    currentUser.lastName
  )}`
  return (
    <>
      <SidebarDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentUser={currentUser}
      />

      <div className="sticky">
        <header className="bg-white lg:bg-transparent sticky">
          <div className="py-6 px-2 lg:px-4 flex justify-between lg:justify-end items-center max-w-7xl mx-auto">
            <Button
              className="lg:hidden !p-0"
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu />
            </Button>

            <nav className="flex items-center gap-2">
              <Avatar className="w-12 h-12 mr-2 cursor-pointer outline outline-1 outline-white/70 ">
                <AvatarImage
                  className="object-cover"
                  src={currentUser.profileUrl || "/images/placeholder.jpg"}
                ></AvatarImage>
                <AvatarFallback className="bg-white">{initials}</AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col ">
                <h1 className="text-base font-bold leading-none">
                  {currentUser.fullName}
                </h1>
                <p className="text-sm text-gray-500 flex">{currentUser.role}</p>
              </div>
            </nav>
          </div>
        </header>
      </div>
    </>
  )
}

export default Navbar
