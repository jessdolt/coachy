import { collection, getDocs, query, where } from "firebase/firestore"
import getSession from "./getSession"
import { db } from "@/lib/firebase"
import { User } from "@/types"

const getCurrentUser = async (): Promise<User | null> => {
  try {
    const session = await getSession()

    if (!session?.user?.email) return null

    const q = query(
      collection(db, "users"),
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
    }
  } catch (e: any) {
    return null
  }
}

export default getCurrentUser
