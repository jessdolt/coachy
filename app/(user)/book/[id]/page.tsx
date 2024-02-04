import getAvailability from "@/actions/getAvailability"
import getCoach from "@/actions/getCoach"
import BackButton from "@/app/(auth)/_components/back-button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { notFound } from "next/navigation"
import React from "react"
import Header from "./header"
import Availability from "./availability"

interface BookIdPageProps {
  params: {
    id: string
  }
}
const BookIdPage: React.FC<BookIdPageProps> = async ({ params: { id } }) => {
  const availability = await getAvailability(id)
  const coach = await getCoach(id)

  if (!coach || !availability) {
    notFound()
  }

  return (
    <div>
      <Header coach={coach} />
      <Availability data={availability} />
    </div>
  )
}

export default BookIdPage
