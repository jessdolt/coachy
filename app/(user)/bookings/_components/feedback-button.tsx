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
import { Send, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import NewRating from "./rating/rating"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface FeedbackButtonProps {
  meeting_id: string
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({ meeting_id }) => {
  const router = useRouter()

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

      toast.success("Booking confirmed")
      router.refresh()
    } catch (e) {
      console.log(e)
      toast.error("Something went wrong")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Send className="w-4 h-4 mr-4" />
          Give a feedback
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        role="form"
        onSubmit={() => console.log("asd")}
      >
        <DialogHeader>
          <DialogTitle>Send a Feedback</DialogTitle>
          <DialogDescription>
            This will help the coach to improve their service
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 ">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="name" className="text-right">
              Rating
            </Label>
            <NewRating
              initialRating={formValue.rating}
              emptySymbol={<Star />}
              fullSymbol={<Star className="fill-black" />}
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
          <Button type="button" onClick={() => submitFeedback()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FeedbackButton
