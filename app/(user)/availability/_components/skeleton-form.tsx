import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

const SkeletonForm = () => {
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
}

export default SkeletonForm
