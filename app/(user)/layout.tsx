import React from "react"
import Sidebar from "./_components/sidebar"
import getCurrentUser from "@/actions/getCurrentUser"
import { redirect } from "next/navigation"

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = async ({
  children,
}) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return null

  // if (
  //   !currentUser.profileUrl ||
  //   !currentUser.firstName ||
  //   !currentUser.lastName ||
  //   !currentUser.phoneNumber
  // ) {
  //   redirect("/setup")
  // }

  return <Sidebar>{children}</Sidebar>
}

export default AuthenticatedLayout
