"use client"
import { Button } from "@/components/ui/button"
import { DEFAULT_AUTH_PAGE } from "@/lib/constants"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

// LIST DOWN BELOW ARE THE CREDENTIALS FOR EXISTING COACHES AND STUDENTS
// EMAIL IS ALSO THE PASSWORD FOR LOGIN.

const coachesCreds = [
  {
    email: "brooklynrosales@mail.com",
    name: "Brooklyn Rosales",
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
    email: "troy@mail.com",
    name: "Troy Kirby",
  },
  {
    email: "lina@mail.com",
    name: "Lina Pope",
  },
]

const main_coach = {
  email: "jay@mail.com",
  name: "Jay Shetty",
}

const main_student = {
  email: "aaron@mail.com",
  name: "Aaron Meadows",
}

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
            <h1 className="text-2xl font-bold">Main Coach to try</h1>
            <div>
              <div className="mt-4 space-y-2" key={main_coach.email}>
                <p>email: {main_coach.email}</p>
                <Button onClick={() => handleLogin(main_coach.email)}>
                  Login as {main_coach.name}
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold">Main Student to try</h1>
            <div>
              <div className="mt-4 space-y-2" key={main_student.email}>
                <p>email: {main_student.email}</p>
                <Button onClick={() => handleLogin(main_student.email)}>
                  Login as {main_student.name}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">Other Coaches</h1>
            <div>
              {coachesCreds.map((coach) => (
                <div className="mt-4 space-y-2" key={coach.email}>
                  <p>email: {coach.email}</p>
                  <Button
                    onClick={() => handleLogin(coach.email)}
                    variant="outline"
                  >
                    Login as {coach.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold">Other Students</h1>
            <div>
              {studentCreds.map((student) => (
                <div className="mt-4 space-y-2" key={student.email}>
                  <p>email: {student.email}</p>
                  <Button
                    onClick={() => handleLogin(student.email)}
                    variant="outline"
                  >
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
