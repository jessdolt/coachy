import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"
import { DEFAULT_DAYS } from "@/lib/constants"
import moment from "moment-timezone"
import { Roles } from "@/types"
import { COLLECTION_USERS } from "@/lib/collections"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, role, password } = body

    if (!email || !role || !password)
      return new NextResponse("Missing info", { status: 400 })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user_id = uuidv4()

    await setDoc(doc(db, COLLECTION_USERS, user_id), {
      email: email,
      role: role,
      password: hashedPassword,
      firstName: "",
      lastName: "",
      profileUrl: "",
    })

    if (role === Roles.Coach) {
      await setDoc(doc(db, "availability", user_id), {
        days: DEFAULT_DAYS,
        timezone: moment.tz.guess(),
        user_id,
        acceptingBooking: false,
      })
    }

    return NextResponse.json(
      {
        email,
        password: hashedPassword,
      },
      { status: 201 }
    )
  } catch (error) {
    console.log(error, "REGISTRATION_ERROR")

    return new NextResponse("Internal Error", { status: 500 })
  }
}
