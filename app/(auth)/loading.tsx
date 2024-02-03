import { Loader2Icon } from "lucide-react"
import React from "react"
import { LoaderIcon } from "react-hot-toast"

const Loading = () => {
  return (
    <div className="absolute top-0 right-0 w-screen h-screen flex items-center justify-center ">
      <Loader2Icon className="animate-spin w-10 h-10 text-muted-foreground" />
    </div>
  )
}

export default Loading
