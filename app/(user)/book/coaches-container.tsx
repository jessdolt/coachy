"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { COLLECTION_USERS } from "@/lib/collections"
import { db } from "@/lib/firebase"
import { ROLES, User } from "@/types"
import {
  collection,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import Coaches from "./coaches"
import SkeletonLoader from "./skeleton-loader"

interface CoachesContainerProps {
  currentUser: User
}

const CoachesContainer: React.FC<CoachesContainerProps> = ({ currentUser }) => {
  const [coaches, setCoaches] = useState<User[]>([])
  const [searchValue, setSearchValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const debouncedSearchValue = useDebounce(searchValue, 300)

  useEffect(() => {
    const fetchCoaches = async () => {
      setIsLoading(true)
      try {
        const w = query(
          collection(db, COLLECTION_USERS),
          orderBy("fullName"),
          startAt(searchValue),
          where("role", "==", ROLES.COACH)
        )

        const querySnapshot2 = await getDocs(w)
        const coaches = querySnapshot2.docs.map((doc) => doc.data())

        setCoaches(coaches as User[])
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    }
    fetchCoaches()

    // disabled because we don't want to refetch the data on every search value change but only when the debounced value changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue])

  return (
    <div className="mt-4">
      <div className="max-w-[60%] mx-auto">
        <div className="relative">
          <Input
            className="shadow-sm"
            placeholder="Search for a coach"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-0 right-0"
            disabled
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {isLoading ? <SkeletonLoader /> : <Coaches data={coaches} />}
    </div>
  )
}

export default CoachesContainer
