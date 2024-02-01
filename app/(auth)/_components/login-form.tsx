"use client"
import { useEffect, useState } from "react"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { useForm, FieldValues, SubmitHandler, set } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthSocialButton from "./auth-social-button"
import { BsGithub, BsGoogle } from "react-icons/bs"
import BackButton from "./back-button"

enum Roles {
  Coach = "coach",
  Student = "student",
}

const LoginForm = () => {
  const { status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard")
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

    const callback = await signIn("credentials", {
      ...data,
      redirect: false,
    })

    if (callback?.error) toast.error(callback.error)
    if (callback?.ok && !callback?.error) {
      toast.success("Logged in")
      router.push("/dashboard")
    }

    setIsLoading(false)
  }

  const socialAction = async (action: string) => {
    setIsLoading(true)
    const callback = await signIn(action, { redirect: false })
    if (callback?.error) toast.error(callback.error)
    if (callback?.ok && !callback?.error) {
      toast.success("Logged in")
      router.push("/dashboard")
    }
    setIsLoading(false)
  }

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <div className="mb-6">
          <BackButton />
          <h1 className="font-extrabold uppercase text-xl lg:text-4xl mb-1 mt-4">
            Coachy
          </h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
              Login
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
          Don't have an account yet?
          <Link href="/signup">
            <span className="underline cursor-pointer">Create an account</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
