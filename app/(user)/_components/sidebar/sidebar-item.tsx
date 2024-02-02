import React from "react"
import Link from "next/link"
import { Route } from "@/types"
import { cn } from "@/lib/utils"

const SidebarItem: React.FC<Route> = ({ name, icon: Icon, path, isActive }) => {
  return (
    <li>
      <Link
        href={path}
        className={cn(
          `
        flex
        gap-2 
        items-center
        px-4
        py-2
        rounded-sm
        border
        border-transparent
        transition
        hover:border
        hover:border-gray-300
        `,
          isActive && "!border-gray-300"
        )}
      >
        <Icon />
        {name}
      </Link>
    </li>
  )
}

export default SidebarItem
