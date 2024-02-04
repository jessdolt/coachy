import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

const loading = () => {
  return (
    <div className="flex flex-col gap-4 min-h-[50vh] w-full">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="flex-1 h-10 w-full bg-gray-200" />
      ))}
    </div>
  )
}

export default loading
