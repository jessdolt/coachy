"use client"

import UseRoutes from "@/hooks/useRoutes"

import Logo from "@/app/_components/navbar/logo"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import SidebarItem from "./sidebar-item"
import { BiLogOut } from "react-icons/bi"

const DesktopSidebar = () => {
  const routes = UseRoutes()

  return (
    <div className="hidden lg:block w-60 bg-white h-full fixed border-r border-r-gray-300 px-6">
      <nav className="py-4 flex flex-col h-full">
        <div className="p-3">
          <Logo />
        </div>

        <ul className="space-y-2 mt-6">
          {routes.map((route) => (
            <SidebarItem {...route} key={route.path} />
          ))}
        </ul>

        <div className="mt-auto">
          <Button
            className="flex items-center gap-2 w-full"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <BiLogOut size={24} />
            Logout
          </Button>
        </div>
      </nav>
    </div>
  )
}

export default DesktopSidebar
