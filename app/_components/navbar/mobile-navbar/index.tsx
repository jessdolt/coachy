import { Button } from "@/components/ui/button"
import React from "react"
import Logo from "../logo"
import Link from "next/link"

const MobileNavbar = () => {
  return (
    <nav className="flex lg:hidden items-center justify-between p-4 ">
      <Logo />

      <Link href="/signup">
        <Button>Start now</Button>
      </Link>
    </nav>
  )
}

export default MobileNavbar
