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
import { db } from "@/lib/firebase"
import { combineDateAndTime } from "@/lib/utils"
import { TimeSlot } from "@/types"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { Send, Star } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import Rating from "react-rating"

interface FeedbackButtonProps {
  time: TimeSlot
  date: Date
  coach_id: string
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  time,
  coach_id,
  date,
}) => {
  const router = useRouter()
  const [formValue, setFormValue] = useState({
    rating: 0,
    message: "",
  })

  const { data } = useSession()

  const submitFeedback = async () => {
    try {
      //   await setDoc(collection(db, "meeting"), {
      //     coach_id: coach_id,
      //     user_id: data?.user.id,
      //     startTime: combineDateAndTime(date, time.startTime),
      //     endTime: combineDateAndTime(date, time.endTime),
      //     date,
      //     review: "",
      //     status: "pending",
      //   })

      toast.success("Booking confirmed")
      router.push("/bookings/upcoming")
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
      <DialogContent className="sm:max-w-[425px]">
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
            {/* <Rating
              initialRating={formValue.rating}
              emptySymbol={<Star />}
              fullSymbol={<Star className="fill-black" />}
              onChange={(value) =>
                setFormValue((prev) => ({ ...prev, rating: value }))
              }
            /> */}
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
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FeedbackButton
