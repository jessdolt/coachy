import NextAuth, { DefaultSession } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"
import { ROLES } from "."
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      role: string
      profileUrl: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role: string
    profileUrl: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: ROLES
    profileUrl: string
  }
}
