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
import { Loader2Icon } from "lucide-react"
import AcceptingBooking from "./accepting-booking"
import SkeletonForm from "./skeleton-form"

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
    setValue,
    setError,
    watch,
    handleSubmit,
    clearErrors,
    formState: { errors, isLoading },
  } = useForm<FormValues>({
    defaultValues: async () => {
      const docRef = doc(db, COLLECTION_AVAILABILITY, currentUser.id)
      const docSnap = await getDoc(docRef)
      const data = docSnap.data()

      if (!data) return defaultValues

      // covert days map object to array
      const a = Object.entries(data.days)

      // map the array to get the hours array
      const b = a.map((day: any) => day[1])

      // map the hours array to get the isChecked and hours array
      // isChecked is based on the length of the hours array,
      // if hours array length === 0 then theres no working sched (timeslot) defined by the coach
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

    // get the hours array of the days that are checked
    // if the day is not checked, return an empty array, meaning theres no working sched (timeslot) defined by the coach
    const newData = days.map((day) => (day.isChecked ? day.hours : []))

    // convert the array to map object for firestore
    const daysData = new Map(newData.map((day, index) => [index, day]))

    try {
      await updateDoc(doc(db, COLLECTION_AVAILABILITY, currentUser.id), {
        days: Object.fromEntries(daysData),
        timezone: data.timezone,
      })

      toast.success("Changes saved")
    } catch (error) {
      toast.error("Error updating availability")
    } finally {
      setIsSaving(false)
    }
  }

  // Watch for changes in the timezone field
  const timezone = watch("timezone")
  const handleTimezoneOnChange = (value: string) => {
    setValue("timezone", value)
  }

  // Watch for changes in the acceptingBooking field
  const acceptingBooking = watch("acceptingBooking")

  const handleAcceptingBooking = async (value: boolean) => {
    try {
      await updateDoc(doc(db, COLLECTION_AVAILABILITY, currentUser.id), {
        acceptingBooking: value,
      })

      setValue("acceptingBooking", value)
    } catch (e) {
      toast.error("Something went wrong. Please try again")
    }
  }

  if (isLoading) return <SkeletonForm />

  return (
    <>
      <AcceptingBooking
        currentUser={currentUser}
        value={acceptingBooking}
        onChange={handleAcceptingBooking}
      />

      {acceptingBooking && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4 grid grid-cols-3 gap-x-8 gap-y-6 ">
            <Schedules
              control={control}
              setError={setError}
              errors={errors}
              clearErrors={clearErrors}
            />
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
