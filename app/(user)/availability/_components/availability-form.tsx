"use client"

import React from "react"
import Schedules from "./schedules"
import TimezonePicker from "./timezone"
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form"
import { TimeSlot } from "@/types"
import { Button } from "@/components/ui/button"
import { defaultDays } from "../constants"

export type FormValues = FieldValues & {
  days: {
    isCheked: boolean
    day: string
    value: number
    hours: TimeSlot[]
  }[]
}

const defaultValues = {
  timeZone: "America/New_York",
  days: defaultDays,
}

const AvailabilityForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4 grid grid-cols-3 gap-x-8 gap-y-6">
        <Schedules register={register} control={control} />
        <TimezonePicker />
      </div>
      <Button className="mt-4">Save</Button>
    </form>
  )
}

export default AvailabilityForm
