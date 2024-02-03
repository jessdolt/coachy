import { Roles } from "@/types"
import { Book, CalendarCheck, LayoutDashboard } from "lucide-react"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

const useRoutes = () => {
  const pathname = usePathname()
  const { data, status } = useSession()

  // if (status != "authenticated") {
  //   return []
  // }

  // const userRole = data?.user.role

  const routes = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      isActive: pathname === "/dashboard",
      roles: [Roles.Coach, Roles.Student],
    },
    {
      name: "Availability",
      path: "/availability",
      icon: CalendarCheck,
      isActive: pathname === "/availability",
      roles: [Roles.Coach, Roles.Student],
    },
    {
      name: "Book",
      path: "/book",
      icon: Book,
      isActive: pathname === "/book",
      roles: [Roles.Coach, Roles.Student],
    },
    {
      name: "Bookings",
      path: "/bookings/upcoming",
      icon: Book,
      isActive: pathname.startsWith("/bookings"),
      roles: [Roles.Coach, Roles.Student],
    },
  ]

  return useMemo(() => routes, [pathname])
}

export default useRoutes
