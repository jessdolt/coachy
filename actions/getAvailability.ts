import { doc, getDoc } from "firebase/firestore"
import getSession from "./getSession"
import { db } from "@/lib/firebase"
import { COLLECTION_AVAILABILITY } from "@/lib/collections"
import { Availability } from "@/types"

const getAvailability = async (user_id: string) => {
  try {
    const session = await getSession()

    if (!session?.user) throw new Error("Unauthorized")

    const q = doc(db, COLLECTION_AVAILABILITY, user_id)
    const docSnap = await getDoc(q)

    return docSnap.data() as Availability
  } catch (e: any) {
    return null
  }
}

export default getAvailability
