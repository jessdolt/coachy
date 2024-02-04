import TimePicker from "@/app/_components/time-picker"
import { Button } from "@/components/ui/button"
import { Plus, Trash } from "lucide-react"
import React from "react"
import {
  Control,
  FieldErrors,
  UseFormSetError,
  useFieldArray,
} from "react-hook-form"
import { FormValues } from "./availability-form"
import { TimeSlot } from "@/types"
import { addTwoHours } from "@/lib/utils"

interface TimeSlotsProps {
  arrayIndex: number
  control: Control<FormValues>
  setError: UseFormSetError<FormValues>
  errors: FieldErrors<FormValues>
}
const TimeSlots: React.FC<TimeSlotsProps> = ({
  arrayIndex,
  control,
  setError,
  errors,
}) => {
  const { fields, remove, append, update } = useFieldArray({
    control,
    name: `days[${arrayIndex}].hours` as "days.0.hours",
  })

  const handleInsertNewTimeSlot = () => {
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
    const newValue = { ...hour, startTime: value, endTime: addTwoHours(value) }

    // Check if overlapping
    // if yes get the index of the overlapping time slot and set error
    //  Error here
    // setError(`days[${arrayIndex}].hours[${index}].startTime`, {
    //   type: "manual",
    //   message: "Start time cannot be after end time",
    // })

    update(index, { ...newValue })
  }

  return (
    <div className="lg:ml-2 flex flex-col gap-4">
      {fields.map((hour, index) => (
        <div className="flex items-center gap-2" key={hour.id}>
          <div className="flex flex-col ">
            <div className="flex items-center gap-2 ">
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
            {errors?.days?.[arrayIndex]?.hours?.[index]?.startTime && (
              <p className="text-xs text-red-600">Error here</p>
            )}
          </div>
          {index === 0 ? (
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => handleInsertNewTimeSlot()}
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
