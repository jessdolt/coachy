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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { useRouter } from "next/navigation"
import { forwardRef, useRef, useState } from "react"
import toast from "react-hot-toast"
import { Rating } from "@smastrom/react-rating"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { DialogClose } from "@radix-ui/react-dialog"

interface FeedbackButtonProps {
  meeting_id: string
}

const FeedbackButton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  FeedbackButtonProps
> = ({ meeting_id }, ref) => {
  const router = useRouter()
  const buttonElement = useRef<HTMLButtonElement>(null)

  const [formValue, setFormValue] = useState({
    rating: 0,
    message: "",
  })

  const submitFeedback = async () => {
    try {
      await updateDoc(doc(db, "meeting", meeting_id), {
        rating: formValue.rating,
        review: formValue.message,
      })

      toast.success("Review Submitted")
      buttonElement.current?.click()
      router.refresh()
    } catch (e) {
      console.error(e)
      toast.error("Something went wrong")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[200px]" ref={ref}>
          <Send className="w-4 h-4 mr-4" />
          Give feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Feedback</DialogTitle>
          <DialogDescription>
            This will help the student to improve their skills and knowledge
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 ">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="name" className="text-right">
              Rating
            </Label>
            <Rating
              value={formValue.rating}
              className="max-w-[150px] focus-visible:border-none focus-visible:outline-none "
              onChange={(value: number) =>
                setFormValue((prev) => ({ ...prev, rating: value }))
              }
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="username" className="text-right">
              Message
            </Label>
            <Textarea
              value={formValue.message}
              onChange={(e) =>
                setFormValue((prev) => ({ ...prev, message: e.target.value }))
              }
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="secondary" ref={buttonElement}>
              Later
            </Button>
          </DialogClose>
          <Button type="button" onClick={() => submitFeedback()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default forwardRef(FeedbackButton)
