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
import { db } from "@/lib/firebase"
import { combineDateAndTime } from "@/lib/utils"
import { TimeSlot } from "@/types"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import moment from "moment"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
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

  const submitBooking = async () => {
    try {
      await addDoc(collection(db, "meeting"), {
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
      console.log(e)
      toast.error("Something went wrong")
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
        <DialogDescription>Short description</DialogDescription>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={() => submitBooking()}>Yes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmBooking