import TimePicker from "@/app/_components/time-picker"
import { Button } from "@/components/ui/button"
import { Plus, Trash } from "lucide-react"
import React, { useEffect } from "react"
import { Control, UseFormRegister, useFieldArray } from "react-hook-form"
import { FormValues } from "./availability-form"
import { TimeSlot } from "@/types"
import { addTwoHours, getTimeOverlap } from "@/lib/utils"

interface TimeSlotsProps {
  arrayIndex: number
  control: Control<FormValues>
  register: UseFormRegister<FormValues>
}
const TimeSlots: React.FC<TimeSlotsProps> = ({
  arrayIndex,
  control,
  register,
}) => {
  const { fields, remove, append, update } = useFieldArray({
    control,
    name: `days[${arrayIndex}].hours` as "days.0.hours",
  })

  const handleInsertNewTimeSlot = (index: number, hour: TimeSlot) => {
    const lastTimeSlot = fields[fields.length - 1]
    const newStartTime = lastTimeSlot.endTime
    const newEndTime = addTwoHours(lastTimeSlot.endTime)

    append({ startTime: newStartTime, endTime: newEndTime })
  }

  const handleSelectOnChange = (
    index: number,
    hour: TimeSlot,
    value: string
  ) => {
    // const isOverlapping = getTimeOverlap(fields, value)
    // console.log(isOverlapping)
    const newValue = { ...hour, startTime: value, endTime: addTwoHours(value) }

    update(index, { ...newValue })
  }

  return (
    <div className="lg:ml-2 flex flex-col gap-4">
      {fields.map((hour, index) => (
        <div className="flex items-center gap-2" key={hour.id}>
          <div className="flex items-center gap-2">
            <TimePicker
              arrayIndex={index}
              value={hour.startTime}
              hour={hour}
              onChange={handleSelectOnChange}
            />
            <div>-</div>
            <TimePicker
              arrayIndex={index}
              value={hour.endTime}
              hour={hour}
              onChange={handleSelectOnChange}
              disabled
            />
          </div>

          {index === 0 ? (
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => handleInsertNewTimeSlot(index, hour)}
            >
              <Plus className="w-3 h-3 lg:h-4 lg:w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => remove(index)}
            >
              <Trash className="w-3 h-3 lg:h-4 lg:w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}

export default TimeSlots
