"use client"
import { useEffect, useState } from "react"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import axios from "axios"
import { toast } from "react-hot-toast"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import BackButton from "./back-button"
import { ROLES } from "@/types"

const RegisterForm = () => {
  const { status } = useSession()

  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/book")
    }
  }, [status, router])

  const [isLoading, setIsLoading] = useState(false)
  const ROLES = [ROLES.COACH, ROLES.STUDENT]

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      role: ROLES[0],
      email: "",
      password: "",
    },
  })

  const roleValue = watch("role")

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    try {
      await axios.post("/api/register", data)
      const callback = await signIn("credentials", { ...data, redirect: false })
      if (callback?.error) toast.error(callback.error)
      if (callback?.ok && !callback?.error) {
        toast.success("Account created successfully")
        router.push("/setup")
      }
    } catch (err: any) {
      console.log(err)
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <div className="mb-6">
          <BackButton />
          <h1 className="font-extrabold uppercase text-xl lg:text-4xl mb-1 mt-4">
            Coachy
          </h1>
          <p className="text-muted-foreground">Sign up to your account</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="password" className="mb-2 block">
              Choose your role
            </Label>

            <RadioGroup
              defaultValue={roleValue}
              className="flex py-2"
              onValueChange={(value) => {
                setValue("role", value)
              }}
            >
              {ROLES.map((role) => (
                <div className="flex items-center space-x-2" key={role}>
                  <RadioGroupItem value={role} id={role} />
                  <Label htmlFor={role}>{role}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="email" className="mb-2 block">
              Email
            </Label>

            <Input
              type="text"
              id="email"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="password" className="mb-2 block">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              register={register}
              disabled={isLoading}
              errors={errors}
            />
          </div>

          <div>
            <Button disabled={isLoading} type="submit" className="w-full">
              Register
            </Button>
          </div>
        </form>

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
