import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-3 mt-8 gap-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton className="col-span-1 h-[200px] bg-gray-200" key={i} />
      ))}
    </div>
  )
}

export default SkeletonLoader
