import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TimeSlot } from "@/types"
import React from "react"

interface TimeSelectorProps {
  times: TimeSlot[]
  selectedTime: TimeSlot | undefined
  setSelectedTime: (time: TimeSlot) => void
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  times,
  setSelectedTime,
  selectedTime,
}) => {
  return (
    <div className="mt-4 grid grid-cols-6 justify-center items-center h-full gap-2 md:gap-8 p-0 md:p-4 max-h-[350px] overflow-y-auto md:max-h-full md:overflow-hidden">
      {times.map((time) => (
        <Button
          key={time.startTime}
          variant="outline"
          size="lg"
          className={cn(
            "col-span-6 md:col-span-2 px-8",
            selectedTime === time && "bg-secondary"
          )}
          onClick={() => setSelectedTime(time)}
        >
          {time.startTime}
        </Button>
      ))}
    </div>
  )
}

export default TimeSelector
