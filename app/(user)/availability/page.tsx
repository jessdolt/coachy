import AvailabilityForm from "./_components/availability-form"
import AcceptingBooking from "./_components/accepting-booking"

const AvailabilityPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 lg:px-4">
      <div className="flex justify-between items-center">
        <div className="px-2 lg:px-0">
          <h1 className="text-2xl lg:text-3xl font-bold">Availability</h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            Configure times when you are available for bookings.
          </p>

          <AcceptingBooking />
        </div>
      </div>

      <AvailabilityForm />
    </div>
  )
}

export default AvailabilityPage
