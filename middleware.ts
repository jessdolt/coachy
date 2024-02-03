import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { redirect } from "next/navigation"
import { Roles } from "./types"
export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    const user = request.nextauth.token as any
    const url = request.nextUrl.clone()

    console.log(user)

    if (
      request.nextUrl.pathname.startsWith("/availability") &&
      user.role !== Roles.Coach
    ) {
      url.pathname = "/unauthorized"
      return NextResponse.redirect(url)
    }

    console.log("here")
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token
      },
    },
    pages: {
      signIn: "/", // Your sign-in page
    },
  }
)

export const config = {
  matcher: ["/dashboard", "/availability", "/book"],
}
