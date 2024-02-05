"use client"
import { Button } from "@/components/ui/button"
import { DEFAULT_AUTH_PAGE } from "@/lib/constants"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

// EMAIL IS ALSO THE PASSWORD FOR LOGIN IN LIST DOWN BELOW ARE THE CREDENTIALS FOR EXISTING COACHES AND STUDENTS
const coachesCreds = [
  {
    email: "brooklynrosales@mail.com",
    name: "Brooklyn Rosales",
  },
  {
    email: "jay@mail.com",
    name: "Jay Shetty",
  },
  {
    email: "gregg@mail.com",
    name: "Gregg Popovich",
  },
  {
    email: "elise@mail.com",
    name: "Elisabeth Buckley",
  },
  {
    email: "freddie@mail.com",
    name: "Freddie Roach",
  },
  {
    email: "aishah@mail.com",
    name: "Aishah Tyler",
  },
]

const studentCreds = [
  {
    email: "aaron@mail.com",
    name: "Aaron Meadows",
  },
  {
    email: "troy@mail.com",
    name: "Troy Kirby",
  },
  {
    email: "lina@mail.com",
    name: "Lina Pope",
  },
]

const ButtonsCreds = () => {
  const router = useRouter()

  const handleLogin = async (email: string) => {
    await signIn("credentials", {
      email: email,
      password: email,
      redirect: false,
    })

    router.push(DEFAULT_AUTH_PAGE)
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col min-w-[800px] gap-8">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">Coaches</h1>
            <div>
              {coachesCreds.map((coach) => (
                <div className="mt-4" key={coach.email}>
                  <p>email: {coach.email}</p>
                  <Button onClick={() => handleLogin(coach.email)}>
                    Login as {coach.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold">Students</h1>
            <div>
              {studentCreds.map((student) => (
                <div className="mt-4" key={student.email}>
                  <p>email: {student.email}</p>
                  <Button onClick={() => handleLogin(student.email)}>
                    Login as {student.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ButtonsCreds
