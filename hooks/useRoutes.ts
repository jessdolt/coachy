import { ROLES } from "@/types"
import { Book, BookCopy, Calendar, CalendarCheck } from "lucide-react"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

const useRoutes = () => {
  const pathname = usePathname()
  const { data } = useSession()

  const routes = [
    {
      name: "Bookings",
      path: "/bookings/upcoming",
      icon: Calendar,
      isActive: pathname.startsWith("/bookings"),
      ROLES: [ROLES.COACH, ROLES.STUDENT],
    },
    {
      name: "Availability",
      path: "/availability",
      icon: CalendarCheck,
      isActive: pathname === "/availability",
      ROLES: [ROLES.COACH],
    },
    {
      name: "Book",
      path: "/book",
      icon: Book,
      isActive: pathname === "/book",
      ROLES: [ROLES.STUDENT],
    },
  ].filter((route) => route.ROLES.find((role) => role === data?.user?.role))

  return useMemo(() => routes, [pathname, data])
}

export default useRoutes
