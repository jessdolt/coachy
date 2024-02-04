"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"

import Logo from "../logo"
import { Button } from "@/components/ui/button"

const MobileNavbar = () => {
  const { status } = useSession()

  return (
    <nav className="flex lg:hidden items-center justify-between p-4 ">
      <Logo />

      {status != "authenticated" ? (
        <Link href="/signup">
          <Button>Start now</Button>
        </Link>
      ) : (
        <Link href="/book">
          <Button>Account</Button>
        </Link>
      )}
    </nav>
  )
}

export default MobileNavbar
