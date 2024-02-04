import { TimeSlot } from "@/types"
import React from "react"
import ConfirmBooking from "./confirm-booking"
import BookingFormSkeleton from "./booking-form-skeleton"
import TimeSelector from "./time-selector"

interface BookingFormProps {
  times: TimeSlot[]
  selectedDate: Date | undefined
  coach_id: string
  selectedTime: TimeSlot | undefined
  setSelectedTime: (time: TimeSlot) => void
  isLoading: boolean
}

const BookingForm: React.FC<BookingFormProps> = ({
  times,
  selectedDate,
  coach_id,
  selectedTime,
  setSelectedTime,
  isLoading,
}) => {
  return (
    <>
      <div className="p-4 flex flex-col h-full">
        <h1 className="font-bold">Choose your time</h1>
        {isLoading ? (
          <BookingFormSkeleton />
        ) : (
          <TimeSelector
            times={times}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        )}
        {selectedTime && (
          <ConfirmBooking
            time={selectedTime}
            date={selectedDate!}
            coach_id={coach_id}
          />
        )}
      </div>
    </>
  )
}

export default BookingForm
