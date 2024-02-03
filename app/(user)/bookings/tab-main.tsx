"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const TabMain = () => {
  const pathname = usePathname()

  const routes = [
    {
      path: "/bookings/upcoming",
      label: "Upcoming",
      isActive: pathname === "/bookings/upcoming",
    },
    {
      path: "/bookings/past",
      label: "Past",
      isActive: pathname === "/bookings/past",
    },
  ]

  return (
    <div className="mt-4 flex gap-2 mb-4">
      {routes.map((route) => (
        <Button
          asChild
          variant={route.isActive ? "outline" : "secondary"}
          key={route.path}
        >
          <Link href={route.path}>{route.label}</Link>
        </Button>
      ))}
    </div>
  )
}

export default TabMain
