import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AuthContext from "@/context/AuthContext"
import ToasterContext from "@/context/ToasterContext"
import Navbar from "./(user)/_components/navbar"
import Sidebar from "./(user)/_components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-muted`}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}