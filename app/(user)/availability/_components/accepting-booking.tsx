"use client"
import { Switch } from "@/components/ui/switch"
import { db } from "@/lib/firebase"
import { collection, doc, getDocs, query, where } from "firebase/firestore"
import { useSession } from "next-auth/react"
import React, { useEffect } from "react"

const AcceptingBooking = () => {
  const [acceptingBooking, setAcceptingBooking] = React.useState(false)
  const { data } = useSession()

  // const checkIfAcceptingBooking = async () => {
  //   try {
  //     const q = query(
  //       collection(db, "availability"),
  //       where("user_id", "==", data.user.id)
  //     )

  //     console.log(q)
  //     const querySnapshot = await getDocs(q)
  //     console.log(querySnapshot.docs[0].data())
  //   } catch (e) {
  //     console.log(e)
  //   } finally {
  //   }
  // }

  const handleSwitchOnChange = async () => {
    // await checkIfAcceptingBooking()
  }

  return (
    <div className="text-sm lg:text-base mt-4 flex gap-2 items-center font-semibold">
      Accepting bookings:{" "}
      <Switch
        checked={acceptingBooking}
        onCheckedChange={handleSwitchOnChange}
      />
    </div>
  )
}

export default AcceptingBooking
