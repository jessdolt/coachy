"use client"
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
import { Label } from "@/components/ui/label"
import { Eye, Star } from "lucide-react"
import NewRating from "./rating/rating"
import { Roles } from "@/types"

interface FeedbackButtonProps {
  review: string
  rating: number
  role: string
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  review,
  rating,
  role,
}) => {
  const isStudent = role === Roles.Student

  const dialogTitle = isStudent ? "Submitted Feedback" : "Feedback"
  const dialogSubTitle = isStudent
    ? "This will help the coach to improve their service"
    : "This will help you to improve your service"

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Eye className="w-4 h-4 mr-4" />
          View Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogSubTitle}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 ">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="name" className="text-right">
              Rating
            </Label>
            <NewRating
              initialRating={rating}
              emptySymbol={<Star />}
              fullSymbol={<Star className="fill-black" />}
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="username" className="text-right">
              Message
            </Label>
            <p className="leading-2">{review}</p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FeedbackButton
