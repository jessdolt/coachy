import TimePicker from "@/app/_components/time-picker"
import { Button } from "@/components/ui/button"
import { Plus, Trash } from "lucide-react"
import React, { useState } from "react"
import {
  Control,
  FieldErrors,
  UseFormClearErrors,
  UseFormSetError,
  useFieldArray,
} from "react-hook-form"
import { FormValues } from "./availability-form"
import { TimeSlot } from "@/types"
import { addTwoHours, getTimeOverlap, isTimeWithinRange } from "@/lib/utils"
import moment from "moment"

interface TimeSlotsProps {
  arrayIndex: number
  control: Control<FormValues>
  errors: FieldErrors<FormValues>

  setError: UseFormSetError<FormValues>
  clearErrors: UseFormClearErrors<FormValues>
}
const TimeSlots: React.FC<TimeSlotsProps> = ({
  arrayIndex,
  control,
  errors,
  setError,
  clearErrors,
}) => {
  const { fields, remove, append, update } = useFieldArray({
    control,
    name: `days[${arrayIndex}].hours` as "days.0.hours",
  })

  const [arrayOfOverlapped, setArrayOfOverlapped] = useState<TimeSlot[]>([])

  const handleInsertNewTimeSlot = () => {
    // sort field to get the last time slot based on end time
    // sorted by end time ascending
    const sortedFields = fields.sort((a, b) =>
      moment(a.endTime, "h:mm A").diff(moment(b.endTime, "h:mm A"))
    )

    // get the last time slot
    const lastTimeSlot = sortedFields[sortedFields.length - 1]

    // get the new start and end time based on the last time slot
    const newStartTime = lastTimeSlot.endTime
    const newEndTime = addTwoHours(lastTimeSlot.endTime)

    // append the new time slot
    append({ startTime: newStartTime, endTime: newEndTime })
  }

  const handleSelectOnChange = (
    index: number,
    hour: TimeSlot,
    value: string
  ) => {
    const newValue = { ...hour, startTime: value, endTime: addTwoHours(value) }

    // An array of not current field to check for overlap
    const excludeItselfFromFields = fields.filter((f, i) => index !== i)

    // Check if the new value for the field overlaps with any other field
    // This returns the field that overlaps
    const isOverlap =
      getTimeOverlap(excludeItselfFromFields, value) ||
      getTimeOverlap(excludeItselfFromFields, addTwoHours(value))

    if (isOverlap) {
      // get index of the field that overlaps to set an error
      const getIndex = fields.findIndex((f) => f.id === isOverlap.id)

      // error for the field who got overlapped
      setError(`days[${arrayIndex}].hours[${getIndex}].startTime`, {
        type: "manual",
        message: "This schedule overlaps with another schedule",
      })

      // store the overlapped field into an array for clearing later
      setArrayOfOverlapped((prev) => [...prev, isOverlap])

      // error for the new value field
      setError(`days[${arrayIndex}].hours[${index}].startTime`, {
        type: "manual",
        message: "This schedule overlaps with another schedule",
      })
    } else {
      // check if theres an existing overlapped field

      if (arrayOfOverlapped.length > 0) {
        // check if the new value for the field overlaps with any other field
        const isOverlap =
          getTimeOverlap(arrayOfOverlapped, value) ||
          getTimeOverlap(arrayOfOverlapped, addTwoHours(value))

        // if there's no overlap, remove the error
        if (!isOverlap) {
          arrayOfOverlapped.forEach((f) => {
            const getIndex = fields.findIndex((field) => field.id === f.id)
            clearErrors([`days[${arrayIndex}].hours[${getIndex}]`])
          })
        }
      }

      // clear error as there's no overlap here
      clearErrors([`days[${arrayIndex}].hours[${index}]`])
    }

    // always update the field with the new value
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
              <p className="text-xs text-red-600">
                This schedule overlaps with another schedule
              </p>
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
