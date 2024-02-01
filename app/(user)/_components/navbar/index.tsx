import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@/types"

interface NavbarProps {
  currentUser: User
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div>
      <header className="bg-transparent">
        <div className="py-6 px-4 flex justify-between items-center max-w-7xl mx-auto  ">
          <h1 className="text-xl">Jess Angel Roque</h1>
          <nav>
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={currentUser.lastName || "/images/placeholder.jpg"}
              ></AvatarImage>
              <AvatarFallback>{`${currentUser.firstName.substring(
                0
              )}${currentUser.lastName.substring(0)}`}</AvatarFallback>
            </Avatar>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Navbar
