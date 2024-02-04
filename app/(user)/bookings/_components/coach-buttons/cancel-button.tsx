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

interface CancelButtonProps {
  meeting_id: string
}

const CancelButton: React.FC<CancelButtonProps> = ({ meeting_id }) => {
  const router = useRouter()

  const onCancel = async () => {
    try {
      await updateDoc(doc(db, "meetings", meeting_id), {
        status: STATUS.CANCELLED,
      })
      toast.success("Meeting Cancelled")
      router.push("/user/bookings")
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
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button onClick={() => onCancel()}>Yes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CancelButton
