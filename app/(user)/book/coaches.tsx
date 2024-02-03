import { User } from "@/types"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface coachesProps {
  data: User[]
}

const Coaches: React.FC<coachesProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-3 mt-8 gap-4">
      {data.map((coach) => (
        <Card
          className="col-span-3 md:col-span-2 lg:col-span-1 border-t-4 border-t-black/80"
          key={coach.id}
        >
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={coach.profileUrl} className="object-cover" />
              </Avatar>
              <p className="text-lg lg:text-xl font-semibold">
                {coach.fullName}
              </p>
            </div>
          </CardHeader>
          <CardDescription>
            <CardContent>short description</CardContent>
          </CardDescription>

          <CardFooter>
            <Button size={"sm"} asChild>
              <Link href={`/book/${coach.id}`}>Book Me</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default Coaches
