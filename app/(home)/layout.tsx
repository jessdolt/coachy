import React from "react"
import Navbar from "../_components/navbar"

interface HomeLayoutProps {
  children: React.ReactNode
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="relative h-screen">
      <Navbar />
      <main className="pt-24 h-full">
        <section className="px-4 max-w-7xl mx-auto h-full">{children}</section>
      </main>
    </div>
  )
}

export default HomeLayout
