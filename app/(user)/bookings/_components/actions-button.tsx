import { Meeting, ROLES } from "@/types"
import React from "react"
import FeedbackButton from "./feedback-button"
import ViewFeedbackButton from "./view-feedback-button"
import getCurrentUser from "@/actions/getCurrentUser"

interface ActionsButton {
  data: Meeting
}

const ActionsButton: React.FC<ActionsButton> = async ({ data }) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return null

  const userRole = currentUser.role
  const hasFeedback = !!data.review && !!data.rating

  return (
    <div>
      {userRole === ROLES.STUDENT ? (
        !hasFeedback ? (
          <FeedbackButton meeting_id={data.id} />
        ) : null
      ) : null}

      {hasFeedback && (
        <ViewFeedbackButton
          review={data.review}
          rating={data.rating}
          role={userRole}
        />
      )}
    </div>
  )
}

export default ActionsButton
