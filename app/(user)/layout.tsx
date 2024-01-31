import React from "react"
import Sidebar from "./_components/sidebar"

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}) => {
  return <Sidebar>{children}</Sidebar>
}

export default AuthenticatedLayout
