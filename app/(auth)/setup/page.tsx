import React from "react"
import SetupForm from "../_components/setup-form"
import getCurrentUser from "@/actions/getCurrentUser"

const SetupPage = async () => {
  const currentUser = await getCurrentUser()

  return (
    <div>
      <SetupForm currentUser={currentUser!} />
    </div>
  )
}

export default SetupPage
