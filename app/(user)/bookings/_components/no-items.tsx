import React from "react"

const NoItems = ({ label }: { label: string }) => {
  return (
    <div className="min-h-[320px]  flex items-center justify-center border border-black/50 rounded-lg">
      <p className="text-muted-foreground">{label}</p>
    </div>
  )
}

export default NoItems
