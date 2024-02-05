import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { COLLECTION_MEETING } from "@/lib/collections"
import { db } from "@/lib/firebase"
import { combineDateAndTime } from "@/lib/utils"
import { TimeSlot } from "@/types"
import { addDoc, collection } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface ConfirmBookingProps {
  time: TimeSlot
  date: Date
  coach_id: string
}

const ConfirmBooking: React.FC<ConfirmBookingProps> = ({
  time,
  coach_id,
  date,
}) => {
  const router = useRouter()
  const { data } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const submitBooking = async () => {
    setIsLoading(true)
    try {
      await addDoc(collection(db, COLLECTION_MEETING), {
        coach_id: coach_id,
        user_id: data?.user.id,
        startTime: combineDateAndTime(date, time.startTime),
        endTime: combineDateAndTime(date, time.endTime),
        date,
        review: "",
        status: "pending",
      })

      toast.success("Booking confirmed")
      router.push("/bookings/upcoming")
    } catch (e) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mx-auto mt-4 p-4" size="lg">
          Confirm Booking
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Booking</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Ensure your spot for a personalized 1-on-1 interview coaching session
          by clicking &apos;Confirm Booking&apos;. This step finalizes your
          reservation and secures dedicated time with your coach.
        </DialogDescription>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={() => submitBooking()} disabled={isLoading}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmBooking
