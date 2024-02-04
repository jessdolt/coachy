import React from "react"
import MarkAsDoneButton from "./coach-buttons/mark-as-done-button"
import { Meeting } from "@/types"
import CancelButton from "./coach-buttons/cancel-button"

interface CoachActionButtonsProps {
  data: Meeting
}

const CoachActionButtons: React.FC<CoachActionButtonsProps> = ({ data }) => {
  return (
    <div className="flex gap-2">
      <MarkAsDoneButton meeting_id={data.id} />
      <CancelButton meeting_id={data.id} />
    </div>
  )
}

export default CoachActionButtons
