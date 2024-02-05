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
import { filterUniqueUsers, parseToTime } from "@/lib/utils"
import { COLLECTION_MEETING } from "@/lib/collections"

const getPastBookings = async (): Promise<Meeting[] | []> => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) return []

    const user_role = currentUser.role

    // the field to query on meeting collections depends on the user role
    const field = user_role === ROLES.STUDENT ? "user_id" : "coach_id"
    // the field to query on getting the other user

    const field_other_user =
      user_role === ROLES.STUDENT ? "coach_id" : "user_id"

    // get all past meetings
    const q = query(
      collection(db, COLLECTION_MEETING),
      and(
        where(field, "==", currentUser.id),
        or(
          where("status", "==", STATUS.DONE),
          where("endTime", "<", toDate(new Date()))
        )
      )
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

    const otherUserArray = uniqueUsers.map(async (booking: any) => {
      const a = doc(db, "users", booking[field_other_user])
      return await getDoc(a)
    })

    const responseOtherUser = await Promise.all(otherUserArray)

    // get the other user details
    const otherUsers = responseOtherUser.map((x) => x.data())

    // combine the other user to the past bookings
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
    return []
  }
}

export default getPastBookings
