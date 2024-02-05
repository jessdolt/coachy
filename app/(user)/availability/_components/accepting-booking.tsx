"use client"
import { Switch } from "@/components/ui/switch"
import { User } from "next-auth"

interface AcceptingBookingProps {
  currentUser: User
  value: boolean
  onChange: (value: boolean) => void
}

const AcceptingBooking: React.FC<AcceptingBookingProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="text-sm lg:text-base mt-4 flex gap-2 items-center font-semibold">
      Accepting bookings:
      <Switch checked={value} onCheckedChange={() => onChange(!value)} />
    </div>
  )
}

export default AcceptingBooking
