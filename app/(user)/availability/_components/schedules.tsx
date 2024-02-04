import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import moment from "moment"
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormStateProps,
  useFieldArray,
} from "react-hook-form"
import { FormValues } from "./availability-form"
import TimeSlots from "./timeslot"

interface SchedulesProps {
  register: UseFormRegister<FormValues>
  control: Control<FormValues>
  setError: UseFormSetError<FormValues>
  errors: FieldErrors<FormValues>
}

const Schedules: React.FC<SchedulesProps> = ({
  register,
  control,
  setError,
  errors,
}) => {
  const { fields, update } = useFieldArray({
    control,
    name: "days",
  })

  const handleSwitchChange = (index: number, day: any) => {
    const newFields = {
      ...day,
      isChecked: !day.isChecked,
      hours: [{ startTime: "9:00 AM", endTime: "11:00 AM" }],
    }

    update(index, newFields)
  }

  return (
    <div className="col-span-3 lg:col-span-2">
      <Card className="p-4 lg:p-8 flex-1">
        <p className="text-sm lg:text-base">Hours Available</p>

        <div className="space-y-4 mt-4 text-sm lg:text-base">
          {fields.map((day: any, index: number) => (
            <div
              className="flex flex-col lg:flex-row items-start lg:items-center gap-4"
              key={day.id}
            >
              <div className="flex gap-2 lg:gap-4 w-40 self-start mt-2">
                <Switch
                  onCheckedChange={() => handleSwitchChange(index, day)}
                  checked={day.isChecked}
                />
                <div>{moment().day(index).format("dddd")}</div>
              </div>

              {/* nested array starts here */}
              {day.isChecked && (
                <TimeSlots
                  control={control}
                  arrayIndex={index}
                  setError={setError}
                  errors={errors}
                />
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Schedules
