import React from "react"

import MonthTab from "./month-tab"
import getCurrentUser from "@/actions/getCurrentUser"

const BookPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return null

  return (
    <>
      <div className="px-2 lg:px-0">
        <h1 className="text-2xl lg:text-3xl font-bold">Available Coaches</h1>
        <p className="text-sm lg:text-base text-muted-foreground">
          Find the right coach for you
        </p>
      </div>

      <MonthTab currentUser={currentUser} />
    </>
  )
}

export default BookPage
