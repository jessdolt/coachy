import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { ROLES } from "./types"

export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    const user = request.nextauth.token as any
    const url = request.nextUrl.clone()

    if (
      request.nextUrl.pathname.startsWith("/book") &&
      user.role !== ROLES.STUDENT
    ) {
      url.pathname = "/availability"
      return NextResponse.redirect(url)
    }

    if (
      request.nextUrl.pathname.startsWith("/availability") &&
      user.role !== ROLES.COACH
    ) {
      url.pathname = "/book"
      return NextResponse.redirect(url)
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token
      },
    },
    pages: {
      signIn: "/",
    },
  }
)

export const config = {
  matcher: ["/availability", "/book", "/bookings"],
}
