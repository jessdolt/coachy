import getCurrentUser from "./getCurrentUser"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Meeting, ROLES, STATUS } from "@/types"
import { toDate } from "date-fns"
import { filterUniqueUsers, parseToTime } from "@/lib/utils"
import { COLLECTION_MEETING } from "@/lib/collections"

const getCancelledBookings = async (): Promise<Meeting[] | []> => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) return []

    const user_role = currentUser.role

    // the field to query on meeting collections depends on the user role
    const field = user_role === ROLES.STUDENT ? "user_id" : "coach_id"

    // the field to query on getting the other user
    const field_other_user =
      user_role === ROLES.STUDENT ? "coach_id" : "user_id"

    // get all cancelled meetings
    const q = query(
      collection(db, COLLECTION_MEETING),
      where("status", "==", STATUS.CANCELLED),
      where(field, "==", currentUser.id),
      orderBy("endTime", "desc")
    )

    const querySnapshot = await getDocs(q)

    // map the result to an array of meetings and included the meeting id
    const result = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as any[]

    // parse the date and time to a readable, format unix timestamp to ISO string to time string
    const upcomingBookings = result.map((upcoming) => ({
      ...upcoming,
      startTime: parseToTime(upcoming.startTime.seconds),
      endTime: parseToTime(upcoming.endTime.seconds),
      date: toDate(upcoming.date.toDate()),
    }))

    // get the unique users based on the field_other_user
    const uniqueUsers = filterUniqueUsers(upcomingBookings, field_other_user)

    // get the other user details
    const otherUserArray = uniqueUsers.map(async (booking: any) => {
      const a = doc(db, "users", booking[field_other_user])
      return await getDoc(a)
    })

    const responseOtherUser = await Promise.all(otherUserArray)

    // map the other user details to the upcoming bookings
    const otherUsers = responseOtherUser.map((x) => x.data())

    // combine the other user to the cancelled bookings
    const data = upcomingBookings.map((booking: any) => {
      const otherUser = otherUsers.find(
        (user: any) => user.id === booking[field_other_user]
      )
      return {
        ...booking,
        otherUser,
      }
    })

    return data as Meeting[]
  } catch (e) {
    console.log(e)
    return []
  }
}

export default getCancelledBookings
