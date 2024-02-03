import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

const BookingFormSkeleton = () => {
  return (
    <div className="mt-4 grid grid-cols-6 justify-center items-center h-full gap-2 md:gap-8 p-0 md:p-4 max-h-[350px] overflow-y-auto md:max-h-full md:overflow-hidden">
      {[...Array(9)].map((_, i) => (
        <Skeleton key={i} className="col-span-6 md:col-span-2 px-8 h-10" />
      ))}
    </div>
  )
}

export default BookingFormSkeleton
