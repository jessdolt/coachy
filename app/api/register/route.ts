import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, role, password } = body

    if (!email || !role || !password)
      return new NextResponse("Missing info", { status: 400 })

    const hashedPassword = await bcrypt.hash(password, 10)

    await setDoc(doc(db, "users", uuidv4()), {
      email: email,
      role: role,
      password: hashedPassword,
      firstName: "",
      lastName: "",
      profileUrl: "",
    })

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
