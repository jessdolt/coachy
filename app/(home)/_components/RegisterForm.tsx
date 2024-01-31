"use client"
import { useEffect } from "react"
import { useState } from "react"
import { useForm, FieldValues, SubmitHandler, set } from "react-hook-form"
import axios from "axios"
import { toast } from "react-hot-toast"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import AuthSocialButton from "./AuthSocialButton"
import { BsGithub, BsGoogle } from "react-icons/bs"

enum Roles {
  Coach = "coach",
  Student = "student",
}

const RegisterForm = () => {
  const { data, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/users")
    }
  }, [status, router])

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      role: "",
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    try {
      await axios.post("/api/register", data)
      signIn("credentials", data)
      toast.success("Account created successfully")
    } catch (err: any) {
      toast.error("Something went wrong")
    }

    setIsLoading(false)
  }

  const socialAction = async (action: string) => {
    setIsLoading(true)
    const callback = await signIn(action, { redirect: false })
    if (callback?.error) toast.error(callback.error)
    if (callback?.ok && !callback?.error) {
      toast.success("Logged in")
      router.push("/users")
    }
    setIsLoading(false)
  }

  return (
    <div className="pt-8  sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="password" className="mb-2 block">
              Choose your role
            </Label>
            <RadioGroup defaultValue="option-one" className="flex py-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Coach</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Student</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="email" className="mb-2 block">
              Email
            </Label>
            <Input type="text" id="email" />
          </div>
          <div>
            <Label htmlFor="password" className="mb-2 block">
              Password
            </Label>
            <Input type="password" id="password" />
          </div>

          <div>
            <Button disabled={isLoading} type="submit" className="w-full">
              Register
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <AuthSocialButton
            icon={BsGithub}
            onClick={() => socialAction("github")}
          />

          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => socialAction("google")}
          />
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          Already have an account?
          <Link href="/login">
            <span className="underline cursor-pointer">Login</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
