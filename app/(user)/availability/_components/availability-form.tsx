"use client"

import React, { useState } from "react"
import Schedules from "./schedules"
import TimezonePicker from "./timezone"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import { TimeSlot, User } from "@/types"
import { Button } from "@/components/ui/button"
import { defaultDays } from "../constants"
import { doc, getDoc, updateDoc } from "firebase/firestore"

import { db } from "@/lib/firebase"
import { COLLECTION_AVAILABILITY } from "@/lib/collections"
import toast from "react-hot-toast"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2Icon } from "lucide-react"
import AcceptingBooking from "./accepting-booking"

export type FormValues = FieldValues & {
  days: {
    isChecked: boolean
    day: string
    value: number
    hours: TimeSlot[]
  }[]
  timezone: string
  acceptingBooking: boolean
}

const defaultValues = {
  timezone: "America/New_York",
  days: defaultDays,
  acceptingBooking: false,
}

interface AvailabilityFormProps {
  currentUser: User
}

const AvailabilityForm: React.FC<AvailabilityFormProps> = ({ currentUser }) => {
  const [isSaving, setIsSaving] = useState(false)

  const {
    control,
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormValues>({
    defaultValues: async () => {
      const docRef = doc(db, COLLECTION_AVAILABILITY, currentUser.id)
      const docSnap = await getDoc(docRef)
      const data = docSnap.data()

      if (!data) return defaultValues

      const a = Object.entries(data.days)
      const b = a.map((day: any) => day[1])
      const c = b.map((day: any) => ({
        isChecked: day.length > 0,
        hours: day,
      }))

      return {
        ...data,
        days: c,
      }
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSaving(true)
    const { days } = data
    const newData = days.map((day) => (day.isChecked ? day.hours : []))
    const daysData = new Map(newData.map((day, index) => [index, day]))

    try {
      await updateDoc(doc(db, COLLECTION_AVAILABILITY, currentUser.id), {
        days: Object.fromEntries(daysData),
        timezone: data.timezone,
      })

      toast.success("Changes saved")
    } catch (error) {
      toast.error("Error updating availability")
      console.log(error)
    } finally {
      setIsSaving(false)
    }
  }

  const timezone = watch("timezone")
  const handleTimezoneOnChange = (value: string) => {
    setValue("timezone", value)
  }

  const acceptingBooking = watch("acceptingBooking")
  const handleAcceptingBooking = async (value: boolean) => {
    try {
      await updateDoc(doc(db, COLLECTION_AVAILABILITY, currentUser.id), {
        acceptingBooking: value,
      })

      setValue("acceptingBooking", value)
    } catch (e) {
      console.log(e)
      toast.error("Something went wrong. Please try again")
    }
  }

  if (isLoading)
    return (
      <div className="mt-4 grid grid-cols-3 gap-x-8 gap-y-6">
        <div className="col-span-3 lg:col-span-2">
          <Card className="p-4 lg:p-8 flex-1">
            <Skeleton className="w-40 h-12" />

            <div className="space-y-4 mt-4">
              {[...Array(7)].map((_, index) => (
                <div className="flex gap-4" key={index}>
                  <Skeleton className="w-20 h-12" />
                  <Skeleton className="w-60 h-12" />
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="col-span-3 lg:col-span-1 flex flex-col">
          <Card className="p-4 lg:p-8">
            <Skeleton className="w-40 h-12" />

            <Skeleton className="w-80 h-12 mt-4" />
          </Card>
        </div>
        <Skeleton className="h-12 w-20 mt-4" />
      </div>
    )

  return (
    <>
      <AcceptingBooking
        currentUser={currentUser}
        value={acceptingBooking}
        onChange={handleAcceptingBooking}
      />

      {acceptingBooking && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4 grid grid-cols-3 gap-x-8 gap-y-6">
            <Schedules register={register} control={control} />
            <TimezonePicker
              value={timezone}
              onChange={handleTimezoneOnChange}
            />
          </div>
          <Button className="mt-4" disabled={isSaving}>
            {isSaving && <Loader2Icon className="mr-2 animate-spin" />}
            Save
          </Button>
        </form>
      )}
    </>
  )
}

export default AvailabilityForm
