import React from "react"
import MobileNavbar from "./mobile-navbar"
import DesktopNavbar from "./desktop-navbar"

const Navbar = () => {
  return (
    <header className="fixed top-0 bg-white w-full ">
      <div className="max-w-7xl mx-auto ">
        <MobileNavbar />
        <DesktopNavbar />
      </div>
    </header>
  )
}

export default Navbar
