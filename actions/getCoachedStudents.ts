import getCurrentUser from "./getCurrentUser"
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { STATUS } from "@/types"
import { COLLECTION_MEETING } from "@/lib/collections"

const getCoachedStudents = async (id: string) => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) return null

    const q = query(
      collection(db, COLLECTION_MEETING),
      where("status", "==", STATUS.DONE),
      where("coach_id", "==", id)
    )

    const snapshot = await getCountFromServer(q)

    return snapshot.data().count
  } catch (e) {
    return null
  }
}

export default getCoachedStudents
