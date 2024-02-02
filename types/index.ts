import { LucideIcon } from "lucide-react"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  profileUrl: string
}

export interface Route {
  name: string
  path: string
  icon: LucideIcon
  isActive: boolean
}
