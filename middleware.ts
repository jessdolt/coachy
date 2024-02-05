import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { ROLES } from "./types"
import { DEFAULT_AUTH_PAGE } from "./lib/constants"

export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    const user = request.nextauth.token as any
    const url = request.nextUrl.clone()

    // added protected routes
    // didn't add unauthorized page so I just redirected them to the default authenticated page (/bookings/upcoming)
    if (
      request.nextUrl.pathname.startsWith("/book") &&
      user.role !== ROLES.STUDENT
    ) {
      url.pathname = DEFAULT_AUTH_PAGE
      return NextResponse.redirect(url)
    }

    if (
      request.nextUrl.pathname.startsWith("/availability") &&
      user.role !== ROLES.COACH
    ) {
      url.pathname = DEFAULT_AUTH_PAGE
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
