import { Meeting, ROLES } from "@/types"
import React from "react"
import FeedbackButton from "./feedback-button"
import ViewFeedbackButton from "./view-feedback-button"
import getCurrentUser from "@/actions/getCurrentUser"
import { Frown } from "lucide-react"

interface ActionsButton {
  data: Meeting
}

const ActionsButton: React.FC<ActionsButton> = async ({ data }) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return null

  const userRole = currentUser.role

  // check if the coach has given feedback
  const hasFeedback = !!data.review && !!data.rating

  const canGiveFeedback = userRole === ROLES.COACH && !hasFeedback

  // check if the student can view feedback, stored in another variable for reading purposes
  const canViewFeedback = hasFeedback
  const noFeedbackYet = userRole === ROLES.STUDENT && !hasFeedback

  return (
    <div>
      {canGiveFeedback && <FeedbackButton meeting_id={data.id} />}

      {canViewFeedback && (
        <ViewFeedbackButton
          review={data.review}
          rating={data.rating}
          role={userRole}
        />
      )}

      {noFeedbackYet && (
        <div className="w-[200px]">
          <div className="text-sm text-muted-foreground font-medium flex items-center gap-2 justify-center">
            <Frown />
            <span> No feedback yet</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ActionsButton
