import getPastBookings from "@/actions/getPastBookings"
import React from "react"
import Items from "../_components/items"
import NoItems from "../_components/no-items"
import getCurrentUser from "@/actions/getCurrentUser"

const PastBookings = async () => {
  const pastBookings = await getPastBookings()
  const currentUser = await getCurrentUser()

  if (!currentUser) return null

  return (
    <div className="flex flex-col gap-4">
      {pastBookings.length > 0 ? (
        <Items data={pastBookings} pastBooking currentUser={currentUser} />
      ) : (
        <NoItems label="You don't have any past bookings" />
      )}
    </div>
  )
}

export default PastBookings
