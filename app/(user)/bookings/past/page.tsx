import getPastBookings from "@/actions/getPastBookings"
import React from "react"
import Items from "../upcoming/items"

const PastBookings = async () => {
  const pastBookings = await getPastBookings()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Items upcomings={pastBookings} />
      </div>
    </div>
  )
}

export default PastBookings
