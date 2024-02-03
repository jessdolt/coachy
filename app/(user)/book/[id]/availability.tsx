"use client"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import {
  cn,
  combineDateAndTime,
  convertISOToTimeString,
  convertUnixTimestampToISOString,
  getDatesForDaysInMonth,
  parseMapDaysToArray,
} from "@/lib/utils"
import { Availability, TimeSlot } from "@/types"
import moment from "moment"
import { useCallback, useEffect, useMemo, useState } from "react"
import NoDate from "./no-date"
import BookingForm from "./booking-form"
import toast from "react-hot-toast"
import { collection, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { toDate } from "date-fns"
interface AvailabilityProps {
  data: Availability
}

const Availability: React.FC<AvailabilityProps> = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [newDate, setNewDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<TimeSlot | undefined>()
  const [times, setTimes] = useState<TimeSlot[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const workingSched = parseMapDaysToArray(data)

  const disabledDayArray = workingSched
    .map((day, i) => (day.length === 0 ? i : undefined))
    .filter((day) => day !== undefined)

  const disabledDays = useMemo(
    () => [
      ...getDatesForDaysInMonth(disabledDayArray, newDate),
      !newDate && new Date(),
    ],
    [newDate]
  )

  useEffect(() => {
    const fetchAvailableTime = async () => {
      if (!selectedDate) return

      setIsLoading(true)
      const day = moment(selectedDate).day()

      try {
        const q = query(
          collection(db, "meeting"),
          where("date", ">=", toDate(selectedDate)),
          where("coach_id", "==", data.user_id)
        )

        const querySnapshot = await getDocs(q)
        const result = querySnapshot.docs.map((doc) => doc.data())

        const time = result
          .map((u) => convertUnixTimestampToISOString(u.startTime.seconds))
          .map((r) => convertISOToTimeString(r))

        const availableTime = workingSched[day].filter((schedule) => {
          return !time.includes(schedule.startTime)
        })

        setTimes(availableTime.length === 0 ? workingSched[day] : availableTime)
      } catch (e) {
        console.log(e)
        toast.error("Something went wrong")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvailableTime()
  }, [selectedDate])

  return (
    <Card className="mt-8">
      <div className="flex flex-col md:flex-row ">
        <Calendar
          fromDate={new Date()}
          disabled={disabledDays}
          selected={selectedDate}
          onSelect={(v) => {
            setSelectedDate(v)
            setSelectedTime(undefined)
          }}
          className="calendar md:max-w-[350px] border-b md:border-r md:border-b-none"
          styles={{
            head_cell: {
              width: "100%",
            },
            table: {
              maxWidth: "none",
            },
            row: {
              justifyContent: "space-around",
            },
          }}
          mode="single"
          onMonthChange={(d) => {
            setNewDate(d)
          }}
        />

        <div className="flex-1">
          {!selectedDate ? (
            <NoDate />
          ) : (
            <BookingForm
              isLoading={isLoading}
              times={times}
              selectedDate={selectedDate}
              coach_id={data.user_id}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          )}
        </div>
      </div>
    </Card>
  )
}

export default Availability
