import React from "react"
import Navbar from "../_components/navbar"

interface HomeLayoutProps {
  children: React.ReactNode
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="relative h-screen">
      <Navbar />
      <main className="pt-[70px] h-full relative">{children}</main>
    </div>
  )
}

export default HomeLayout
