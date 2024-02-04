import getCurrentUser from "@/actions/getCurrentUser"
import getUpcomingBookings from "@/actions/getUpcomingBookings"
import { Card } from "@/components/ui/card"
import { Button } from "react-day-picker"
import Items from "../_components/items"

const UpcomingPage = async () => {
  const upcomings = await getUpcomingBookings()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Items upcomings={upcomings} />
      </div>
    </div>
  )
}

export default UpcomingPage
