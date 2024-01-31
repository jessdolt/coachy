import { Button } from "@/components/ui/button"
import React from "react"
import Logo from "../logo"
import Link from "next/link"

const DesktopNavbar = () => {
  return (
    <nav className="hidden lg:flex items-center justify-between p-4">
      <Logo />
      <div className="space-x-2">
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>

        <Link href="/signup">
          <Button>Start now</Button>
        </Link>
      </div>
    </nav>
  )
}

export default DesktopNavbar
