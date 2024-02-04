import getPastBookings from "@/actions/getPastBookings"
import React from "react"
import Items from "../_components/items"
import NoItems from "../_components/no-items"

const PastBookings = async () => {
  const pastBookings = await getPastBookings()

  return (
    <div className="flex flex-col gap-4">
      {pastBookings.length > 0 ? (
        <Items data={pastBookings} pastBooking />
      ) : (
        <NoItems label="You don't have any past bookings" />
      )}
    </div>
  )
}

export default PastBookings
