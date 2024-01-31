"use client"

import { Toaster } from "react-hot-toast"

const ToasterContext = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        className: "",
        style: {
          padding: "16px",
          color: "#fff",
          background: "#333",
          fontSize: "0.75rem",
        },
      }}
    />
  )
}

export default ToasterContext
