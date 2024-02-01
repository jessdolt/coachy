import React from "react"
import Sidebar from "./_components/sidebar"
import getCurrentUser from "@/actions/getCurrentUser"

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = async ({
  children,
}) => {
  return <Sidebar>{children}</Sidebar>
}

export default AuthenticatedLayout
