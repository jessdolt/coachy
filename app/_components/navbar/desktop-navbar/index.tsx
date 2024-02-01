"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"

import Logo from "../logo"
import { Button } from "@/components/ui/button"

const DesktopNavbar = () => {
  const { status } = useSession()
  return (
    <nav className="hidden lg:flex items-center justify-between p-4">
      <Logo />
      <div className="space-x-2">
        {status != "authenticated" ? (
          <>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>

            <Link href="/signup">
              <Button>Start now</Button>
            </Link>
          </>
        ) : (
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default DesktopNavbar
