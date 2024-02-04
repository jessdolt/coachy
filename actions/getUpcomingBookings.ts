import getCurrentUser from "./getCurrentUser"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Meeting, ROLES } from "@/types"
import { toDate } from "date-fns"
import { filterUniqueUsers, parseToTime } from "@/lib/utils"

const getUpcomingBookings = async (): Promise<Meeting[] | []> => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) return []

    const user_role = currentUser.role
    const field = user_role === ROLES.STUDENT ? "user_id" : "coach_id"
    const field_other_user =
      user_role === ROLES.STUDENT ? "coach_id" : "user_id"

    const q = query(
      collection(db, "meeting"),
      where(field, "==", currentUser.id),
      where("startTime", ">=", toDate(new Date()))
    )

    const querySnapshot = await getDocs(q)

    const result = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as any[]

    const upcomingBookings = result.map((upcoming) => ({
      ...upcoming,
      startTime: parseToTime(upcoming.startTime.seconds),
      endTime: parseToTime(upcoming.endTime.seconds),
      date: toDate(upcoming.date.toDate()),
    }))

    const otherUserArray = filterUniqueUsers(upcomingBookings, field).map(
      async (booking: any) => {
        const t = doc(db, "users", booking[field_other_user])
        return await getDoc(t)
      }
    )

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
    console.log(e)
    return []
  }
}

export default getUpcomingBookings
