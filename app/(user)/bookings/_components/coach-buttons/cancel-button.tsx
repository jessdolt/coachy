"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Ban } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { DialogClose } from "@radix-ui/react-dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { STATUS } from "@/types"
import { useRef } from "react"
import { COLLECTION_MEETING } from "@/lib/collections"

interface CancelButtonProps {
  meeting_id: string
}

const CancelButton: React.FC<CancelButtonProps> = ({ meeting_id }) => {
  const router = useRouter()
  const buttonElement = useRef<HTMLButtonElement>(null)

  const onCancel = async () => {
    try {
      await updateDoc(doc(db, COLLECTION_MEETING, meeting_id), {
        status: STATUS.CANCELLED,
      })

      // click the hidden button to close the dialog
      buttonElement.current?.click()

      toast.success("Meeting Cancelled")
      router.refresh()
    } catch (error) {
      toast.error("Error cancelling meeting")
    }
  }

  return (
    <>
      <Dialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DialogTrigger asChild>
                <Button
                  size="icon"
                  variant="destructive"
                  asChild
                  className="p-2 rounded-full"
                >
                  <Ban className="w-10 h-10" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>

            <TooltipContent>
              <p>Cancel Meeting</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancel Meeting?</DialogTitle>
            <DialogDescription>
              You are about to cancel this meeting. Are you sure?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose>
              <Button variant="secondary" ref={buttonElement}>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={() => onCancel()}>Yes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CancelButton
