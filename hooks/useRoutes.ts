import { Book, CalendarCheck, LayoutDashboard } from "lucide-react"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

const UseRoutes = () => {
  const pathname = usePathname()

  const routes = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      isActive: pathname === "/dashboard",
    },
    {
      name: "Availability",
      path: "/availability",
      icon: CalendarCheck,
      isActive: pathname === "/availability",
    },
    {
      name: "Book",
      path: "/book",
      icon: Book,
      isActive: pathname === "/book",
    },
  ]

  return useMemo(() => routes, [pathname])
}

export default UseRoutes
