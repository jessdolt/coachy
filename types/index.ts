import { LucideIcon } from "lucide-react"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  phoneNumber: string
  role: string
  profileUrl: string
}

export interface Route {
  name: string
  path: string
  icon: LucideIcon
  isActive: boolean
}

export interface TimeSlot {
  startTime: string
  endTime: string
}

export enum Roles {
  Coach = "Coach",
  Student = "Student",
}

export interface Availability {
  timezone: string
  user_id: string
  days: {
    0: TimeSlot[]
    1: TimeSlot[]
    2: TimeSlot[]
    3: TimeSlot[]
    4: TimeSlot[]
    5: TimeSlot[]
    6: TimeSlot[]
  }
  acceptingBooking: boolean
}
