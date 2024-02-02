import bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { AuthOptions } from "next-auth"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

export const authOptions: AuthOptions = {
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
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
          collection(db, "users"),
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
      session.user = token.user as any
      return session
    },
    async jwt({ token, trigger, user, session }) {
      if (user) {
        token.user = user
      }

      if (trigger === "update") {
        if (session?.user?.id) {
          token.user = session.user
        }
      }

      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
