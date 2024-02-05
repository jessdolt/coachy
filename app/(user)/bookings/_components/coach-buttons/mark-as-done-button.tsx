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
import { Check } from "lucide-react"
import { useRef } from "react"
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
import FeedbackButton from "../feedback-button"
import { COLLECTION_MEETING } from "@/lib/collections"

interface MarkAsDoneButtonProps {
  meeting_id: string
}

const MarkAsDoneButton: React.FC<MarkAsDoneButtonProps> = ({ meeting_id }) => {
  const buttonElement = useRef<HTMLButtonElement>(null)
  const buttonFeedbackElement = useRef<HTMLButtonElement>(null)

  const onDone = async () => {
    try {
      await updateDoc(doc(db, COLLECTION_MEETING, meeting_id), {
        status: STATUS.DONE,
      })

      // click the hidden button to close the dialog
      buttonElement.current?.click()
      // click the hidden button to open the feedback dialog
      buttonFeedbackElement.current?.click()
      toast.success("Meeting marked as done")
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
                <Button size="icon" className="rounded-full p-2" asChild>
                  <Check className="w-10 h-10 " />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark as done</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              By marking this as done, you will be able to leave a feedback
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose>
              <Button variant="secondary" ref={buttonElement}>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={() => onDone()}>Mark as done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="hidden">
        <FeedbackButton meeting_id={meeting_id} ref={buttonFeedbackElement} />
      </div>
    </>
  )
}

export default MarkAsDoneButton
