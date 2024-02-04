import getCurrentUser from "./getCurrentUser"
import {
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  where,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Meeting, ROLES, STATUS } from "@/types"
import { toDate } from "date-fns"
import {
  convertISOToTimeString,
  convertUnixTimestampToISOString,
  filterUniqueUsers,
} from "@/lib/utils"
import { COLLECTION_MEETING } from "@/lib/collections"

const getCancelledBookings = async (): Promise<Meeting[] | []> => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) return []

    const user_role = currentUser.role
    const field = user_role === ROLES.STUDENT ? "user_id" : "coach_id"
    const field_other_user =
      user_role === ROLES.STUDENT ? "coach_id" : "user_id"

    const q = query(
      collection(db, COLLECTION_MEETING),
      where("status", "==", STATUS.CANCELLED)
    )

    const querySnapshot = await getDocs(q)
    const result = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as any[]

    const upcomingBookings = result.map((upcoming) => ({
      ...upcoming,
      startTime: convertISOToTimeString(
        convertUnixTimestampToISOString(upcoming.startTime.seconds)
      ),
      endTime: convertISOToTimeString(
        convertUnixTimestampToISOString(upcoming.endTime.seconds)
      ),
      date: toDate(upcoming.date.toDate()),
    }))

    const uniqueUsers = filterUniqueUsers(upcomingBookings, field_other_user)

    const otherUserArray = uniqueUsers.map(async (booking: any) => {
      const t = doc(db, "users", booking[field_other_user])
      return await getDoc(t)
    })

    const responseOtherUser = await Promise.all(otherUserArray)
    const otherUsers = responseOtherUser.map((x) => x.data())

    const a = upcomingBookings.map((booking: any) => {
      const otherUser = otherUsers.find(
        (user: any) => user.id === booking[field_other_user]
      )
      return {
        ...booking,
        otherUser,
      }
    })

    return a as Meeting[]
  } catch (e) {
    return []
  }
}

export default getCancelledBookings
