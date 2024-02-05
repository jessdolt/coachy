"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"

import Logo from "../logo"
import { Button } from "@/components/ui/button"
import { DEFAULT_AUTH_PAGE } from "@/lib/constants"

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
          <Link href={DEFAULT_AUTH_PAGE}>
            <Button>Account</Button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default DesktopNavbar
