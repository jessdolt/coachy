import React from "react"
import Logo from "../_components/navbar/logo"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center flex-col min-h-screen p-4">
      {children}
    </div>
  )
}

export default AuthLayout
