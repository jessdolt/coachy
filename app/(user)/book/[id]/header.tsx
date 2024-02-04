"use client"

import BackButton from "@/app/(auth)/_components/back-button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { User } from "@/types"
import { Users } from "lucide-react"

interface HeaderProps {
  coach: User
}

const Header: React.FC<HeaderProps> = ({ coach }) => {
  return (
    <div>
      <div>
        <BackButton />
      </div>
      <div className="flex gap-4 items-center border-b py-4">
        <Avatar className="w-14 h-14 lg:w-20 lg:h-20">
          <AvatarImage src={coach.profileUrl} className="object-cover" />
        </Avatar>

        <div className="space-y-2">
          <h1 className="text-xl lg:text-3xl font-bold">{coach.fullName}</h1>
          <div className="text-sm lg:text-base flex gap-2 items-center">
            Coached students: 13 <Users className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
