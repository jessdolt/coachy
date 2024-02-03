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
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { useSession } from "next-auth/react"
import { db } from "@/lib/firebase"

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

  const session = useSession()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { days } = data
    const newData = days.map((day) => day.hours)

    const daysData = new Map(newData.map((day, index) => [index, day]))

    try {
      const q = query(
        collection(db, "availability"),
        where("user_id", "==", session.data.user.id)
      )

      const querySnapshot = await getDocs(q)
      const docRef = querySnapshot.docs[0].ref.id

      await updateDoc(doc(db, "availability", docRef), {
        days: Object.fromEntries(daysData),
      })
    } catch (error) {
      console.log(error)
    }
  }

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
