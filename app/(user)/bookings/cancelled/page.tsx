import React from "react"
import Items from "../_components/items"
import NoItems from "../_components/no-items"
import getCurrentUser from "@/actions/getCurrentUser"
import getCancelledBookings from "@/actions/getCancelledBookings"

const CancelledBookings = async () => {
  const cancelledBookings = await getCancelledBookings()
  const currentUser = await getCurrentUser()

  if (!currentUser) return null

  return (
    <div className="flex flex-col gap-4">
      {cancelledBookings.length > 0 ? (
        <Items
          data={cancelledBookings}
          cancelledBooking
          currentUser={currentUser}
        />
      ) : (
        <NoItems label="You don't have any cancelled bookings" />
      )}
    </div>
  )
}

export default CancelledBookings
