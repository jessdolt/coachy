import React from "react"
import SetupForm from "../_components/setup-form"
import getCurrentUser from "@/actions/getCurrentUser"

const SetupPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return null
  return (
    <div>
      <SetupForm currentUser={currentUser} />
    </div>
  )
}

export default SetupPage
