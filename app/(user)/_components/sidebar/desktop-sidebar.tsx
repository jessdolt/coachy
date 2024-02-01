"use client"

import UseRoutes from "@/hooks/useRoutes"
import Link from "next/link"

import Logo from "@/app/_components/navbar/logo"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

const DesktopSidebar = () => {
  const routes = UseRoutes()

  return (
    <div className="w-60 bg-white h-full fixed border-r border-r-gray-300 px-6">
      <nav className="py-4 flex flex-col h-full">
        <div className="p-3">
          <Logo />
        </div>

        <ul className="space-y-2 mt-6">
          {routes.map(({ icon: Icon, ...route }) => (
            <li>
              <Link
                href={route.path}
                className={cn(
                  `
                    group
                    flex
                    gap-x-3
                    rounded-md
                    p-3
                    text-sm
                    leading-6
                    font-semibold
                    text-gray-600
                    hover:text-black
                    hover:bg-gray-100
                    `,
                  route.isActive && "bg-gray-100 !text-black"
                )}
              >
                <Icon />
                <span>{route.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <Button
            className="w-full"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </Button>
        </div>
      </nav>
    </div>
  )
}

export default DesktopSidebar
