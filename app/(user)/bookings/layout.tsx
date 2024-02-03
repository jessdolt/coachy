import React from "react"
import Header from "./header"

interface BookingsLayoutProps {
  children: React.ReactNode
}

const BookingsLayout: React.FC<BookingsLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default BookingsLayout
