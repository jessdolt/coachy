import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import getSession from "./getSession"
import { db } from "@/lib/firebase"
import { COLLECTION_USERS } from "@/lib/collections"
import { User } from "@/types"

const getCoach = async (user_id: string): Promise<User | null> => {
  try {
    const session = await getSession()

    if (!session?.user) return null

    const q = doc(db, COLLECTION_USERS, user_id)
    const docSnap = await getDoc(q)

    return docSnap.data() as User
  } catch (e: any) {
    return null
  }
}

export default getCoach
