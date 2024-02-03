import bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials"
import { AuthOptions } from "next-auth"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { revalidatePath } from "next/cache"
import { COLLECTION_USERS } from "./collections"
import { Roles } from "@/types"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Invalid credentials")

        const q = query(
          collection(db, COLLECTION_USERS),
          where("email", "==", credentials.email)
        )
        const querySnapshot = await getDocs(q)

        const user = querySnapshot.docs[0].data()

        const user_id = querySnapshot.docs[0].id

        if (!user?.password) throw new Error("Invalid credentials")

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password as string
        )

        if (!isCorrectPassword) throw new Error("Invalid Password")

        return {
          id: user_id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          name: user.firstName + user.lastName,
          role: user.role,
          profileUrl: user.profileUrl,
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
        session.user.id = token.id as string
        session.user.profileUrl = token.profileUrl as string
      }

      return session
    },
    async jwt({ token, trigger, user, session }) {
      if (user) {
        token.role = user.role as Roles
        token.id = user.id
        token.profileUrl = user.profileUrl
      }

      if (trigger === "update") {
        if (session?.user?.id) {
          token.name = session.user.fullName
          token.profileUrl = session.user.profileUrl
        }
      }

      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
