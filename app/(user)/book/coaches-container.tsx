"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { COLLECTION_USERS } from "@/lib/collections"
import { db } from "@/lib/firebase"
import { ROLES, User } from "@/types"
import {
  collection,
  getDocs,
  limit,
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

const nextPage = 6

const CoachesContainer: React.FC<CoachesContainerProps> = ({ currentUser }) => {
  const [coaches, setCoaches] = useState<User[]>([])
  const [searchValue, setSearchValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [limitPage, setLimitPage] = useState(6)
  const debouncedSearchValue = useDebounce(searchValue, 300)

  useEffect(() => {
    const fetchCoaches = async () => {
      setIsLoading(true)
      try {
        const w = query(
          collection(db, COLLECTION_USERS),
          orderBy("fullName"),
          startAt(searchValue),
          limit(limitPage),
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
  }, [limitPage, debouncedSearchValue])

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

      {/* <div className="flex justify-center mt-4 py-4">
        <Button
          onClick={() => setLimitPage((prevLimit) => prevLimit + nextPage)}
          size="lg"
          className="w-full max-w-[450px]"
          disabled={isLoading}
        >
          Load more
        </Button>
      </div> */}
    </div>
  )
}

export default CoachesContainer
