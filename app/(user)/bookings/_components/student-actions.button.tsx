import React from "react"
import CancelButton from "./coach-buttons/cancel-button"
import { Meeting } from "@/types"

interface StudentActionsButtonsProps {
  data: Meeting
}

const StudentActionsButtons: React.FC<StudentActionsButtonsProps> = ({
  data,
}) => {
  return (
    <div>
      <CancelButton meeting_id={data.id} />
    </div>
  )
}

export default StudentActionsButtons
