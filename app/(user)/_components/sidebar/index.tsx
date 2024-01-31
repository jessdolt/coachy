import React from "react"
import Navbar from "../navbar"

interface SidebarProps {
  children: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div>
      <div>Sidebar</div>
      <main>
        <Navbar />
        {children}
      </main>
    </div>
  )
}

export default Sidebar
