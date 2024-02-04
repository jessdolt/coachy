import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Meeting, ROLES, User } from "@/types"
import { Mail, Phone } from "lucide-react"
import moment from "moment"
import React from "react"
import ActionsButton from "./actions-button"
import CoachActionButtons from "./coach-actions-button"
import StudentActionsButtons from "./student-actions.button"

interface ItemsProps {
  data: Meeting[]
  cancelledBooking?: boolean
  pastBooking?: boolean
  currentUser: User
}

const Items: React.FC<ItemsProps> = ({
  data,
  pastBooking,
  cancelledBooking = false,
  currentUser,
}) => {
  const isCoach = currentUser.role === ROLES.COACH

  return (
    <>
      <div className="flex flex-col gap-4">
        {data.map((meeting) => (
          <Card
            className="p-4 md:px-4 md:py-8 flex flex-col sm:flex-row items-center gap-4"
            key={meeting.id}
          >
            <div className="w-full sm:w-[200px]">
              <p className="font-medium">{moment(meeting.date).format("LL")}</p>
              <p className="text-muted-foreground text-sm">
                {meeting.startTime} - {meeting.endTime}
              </p>
            </div>
            <div className="w-full flex-1 flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center gap-4">
              <div className="flex gap-4 items-center">
                <Avatar>
                  <AvatarImage
                    src={meeting?.otherUser?.profileUrl}
                    className="object-cover"
                  />
                </Avatar>
                <h2 className="text-sm sm:text-base  font-semibold">
                  {meeting?.otherUser?.fullName}
                </h2>
              </div>
              <div className="space-y-1">
                <div className="flex text-sm items-center gap-2">
                  <Phone className="w-4 h-4 " />
                  <p>{meeting?.otherUser?.phoneNumber}</p>
                </div>
                <div className="flex text-sm items-center gap-2">
                  <Mail className="w-4 h-4 " />
                  <p>{meeting?.otherUser?.email}</p>
                </div>
              </div>

              {/* upcoming bookings button */}
              {!cancelledBooking && !pastBooking && isCoach && (
                <CoachActionButtons data={meeting} />
              )}

              {!cancelledBooking && !pastBooking && !isCoach && (
                <StudentActionsButtons data={meeting} />
              )}

              {/* past bookings */}
              {!cancelledBooking && pastBooking && (
                <ActionsButton data={meeting} />
              )}
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Items
