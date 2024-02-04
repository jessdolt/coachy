import type { Metadata } from "next"
import { Noto_Sans } from "next/font/google"
import AuthContext from "@/context/AuthContext"
import ToasterContext from "@/context/ToasterContext"
import "@smastrom/react-rating/style.css"
import "./globals.css"

const notoSans = Noto_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Coachy",
  description: "An easy way to find your coach",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className} bg-muted`}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
