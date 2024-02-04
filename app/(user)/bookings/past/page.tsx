import getPastBookings from "@/actions/getPastBookings"
import React from "react"
import Items from "../_components/items"

const PastBookings = async () => {
  const pastBookings = await getPastBookings()

  return (
    <div className="flex flex-col gap-4">
      <Items upcomings={pastBookings} pastBooking />
    </div>
  )
}

export default PastBookings
