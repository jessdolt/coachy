import { collection, getDocs, query, where } from "firebase/firestore"
import getSession from "./getSession"
import { db } from "@/lib/firebase"
import { User } from "@/types"
import { COLLECTION_USERS } from "@/lib/collections"

const getCurrentUser = async (): Promise<User | null> => {
  try {
    const session = await getSession()

    if (!session?.user) return null

    const q = query(
      collection(db, COLLECTION_USERS),
      where("email", "==", session.user.email)
    )
    const querySnapshot = await getDocs(q)

    const user = querySnapshot.docs[0].data()

    const user_id = querySnapshot.docs[0].id

    if (!user) return null

    return {
      id: user_id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      profileUrl: user.profileUrl,
      phoneNumber: user.phoneNumber,
      fullName: `${user.firstName} ${user.lastName}`,
    }
  } catch (e: any) {
    return null
  }
}

export default getCurrentUser
