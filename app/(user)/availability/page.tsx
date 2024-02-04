import AvailabilityForm from "./_components/availability-form"
import getCurrentUser from "@/actions/getCurrentUser"

const AvailabilityPage = async () => {
  const currentUser = await getCurrentUser()

  return (
    <>
      <div className="lg:px-0">
        <h1 className="text-2xl lg:text-3xl font-bold">Availability</h1>
        <p className="text-sm lg:text-base text-muted-foreground">
          Configure times when you are available for bookings.
        </p>
      </div>

      <AvailabilityForm currentUser={currentUser!} />
    </>
  )
}

export default AvailabilityPage
