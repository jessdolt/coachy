import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Meeting } from "@/types"
import { Mail, Phone } from "lucide-react"
import moment from "moment"
import React from "react"
import FeedbackButton from "./feedback-button"
import ActionsButton from "./actions-button"

interface ItemsProps {
  upcomings: Meeting[]
  pastBooking?: boolean
}

const Items: React.FC<ItemsProps> = ({ upcomings, pastBooking }) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        {upcomings.map((upcoming) => (
          <Card className="px-4 py-8 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-[200px]">
              <p className="font-medium">
                {moment(upcoming.date).format("LL")}
              </p>
              <p className="text-muted-foreground text-sm">
                {upcoming.startTime} - {upcoming.endTime}
              </p>
            </div>
            <div className="w-full flex-1 flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center gap-4">
              <div className="flex gap-4 items-center">
                <Avatar>
                  <AvatarImage
                    src={upcoming?.otherUser?.profileUrl}
                    className="object-cover"
                  />
                </Avatar>
                <h2 className="text-lg font-semibold">
                  {upcoming?.otherUser?.fullName}
                </h2>
              </div>
              <div>
                <div className="flex text-sm items-center gap-2">
                  <Phone className="w-4 h-4 " />
                  <p>{upcoming?.otherUser?.phoneNumber}</p>
                </div>
                <div className="flex text-sm items-center gap-2">
                  <Mail className="w-4 h-4 " />
                  <p>{upcoming?.otherUser?.email}</p>
                </div>
              </div>
              {pastBooking && <ActionsButton data={upcoming} />}
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Items
