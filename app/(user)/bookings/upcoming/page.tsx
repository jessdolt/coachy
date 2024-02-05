import getCurrentUser from "@/actions/getCurrentUser"
import getUpcomingBookings from "@/actions/getUpcomingBookings"
import Items from "../_components/items"
import NoItems from "../_components/no-items"

const UpcomingPage = async () => {
  const upcomings = await getUpcomingBookings()
  const currentUser = await getCurrentUser()

  if (!currentUser) return null

  return (
    <div className="flex flex-col gap-4">
      <div>
        {upcomings.length > 0 ? (
          <Items data={upcomings} currentUser={currentUser} />
        ) : (
          <NoItems label="You don't have any upcoming bookings" />
        )}
      </div>
    </div>
  )
}

export default UpcomingPage
