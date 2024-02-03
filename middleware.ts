import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { redirect } from "next/navigation"
export default withAuth(
  async function middleware(req) {
    const user = req.nextauth.token?.user as any
    const url = req.nextUrl.clone()

    // if (!user.firstName && !user.lastName && !user.profileUrl) {
    //   url.pathname = "/setup"
    //   return NextResponse.redirect(url)
    // }

    // Check if the user is logged in and it's their first login
    // if (user && user?.user?.firstLogin) {
    //   // Redirect to the reset-password route
    //   url.pathname = "/reset-password"
    //   return NextResponse.redirect(url)
    //   // console.log("here")
    //   // redirect("/reset-password")
    // }
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
