import getAvailability from "@/actions/getAvailability"
import getCoach from "@/actions/getCoach"
import { notFound } from "next/navigation"
import React from "react"
import Header from "./header"
import Availability from "./availability"
import getCoachedStudents from "@/actions/getCoachedStudents"

interface BookIdPageProps {
  params: {
    id: string
  }
}
const BookIdPage: React.FC<BookIdPageProps> = async ({ params: { id } }) => {
  const availability = await getAvailability(id)
  const coach = await getCoach(id)
  const coached_students = await getCoachedStudents(id)

  if (!coach || !availability) {
    notFound()
  }

  const isCoachAvailable = availability.acceptingBooking

  return (
    <div>
      <Header coach={coach} coached_students={coached_students ?? 0} />
      {isCoachAvailable ? (
        <Availability data={availability} />
      ) : (
        <div className="min-h-[320px] mt-8  flex items-center justify-center border border-black/50 rounded-lg">
          <p className="text-muted-foreground">
            {coach.fullName} is not accepting bookings at the moment
          </p>
        </div>
      )}
    </div>
  )
}

export default BookIdPage
