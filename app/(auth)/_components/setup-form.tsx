"use client"
import { useEffect, useState } from "react"
import { useForm, FieldValues, SubmitHandler, set } from "react-hook-form"
import axios from "axios"
import { toast } from "react-hot-toast"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { CldUploadButton } from "next-cloudinary"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { User } from "@/types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SetupFormProps {
  currentUser: User
}

const SetupForm: React.FC<SetupFormProps> = ({ currentUser }) => {
  const router = useRouter()
  const { data, update } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      profileUrl: currentUser.profileUrl,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    },
  })

  const profileUrl = watch("profileUrl")

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    try {
      await updateDoc(doc(db, "users", currentUser.id), {
        profileUrl: data.profileUrl,
        firstName: data.firstName,
        lastName: data.lastName,
      })

      update({
        user: {
          ...currentUser,
          profileUrl: data.profileUrl,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      })

      router.push("/dashboard")
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpload = (result: any) => {
    setValue("profileUrl", result?.info?.secure_url, {
      shouldValidate: true,
    })
  }

  if (!isMounted) return null

  return (
    <div className="pt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <div className="mb-6">
          <h1 className="font-extrabold  text-xl lg:text-2xl mb-1 ">
            Account Setup
          </h1>
          <p className="text-muted-foreground">Fill up your information</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2 flex flex-col gap-x-3">
            <Label htmlFor="upload-img" className="mb-2 block">
              Add your profile image
            </Label>
            <div className="mt-2 flex items-center gap-x-3">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={profileUrl || "/images/placeholder.jpg"}
                  className="object-cover"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="cnms8ohb"
                className="self-end"
              >
                <Button disabled={isLoading} variant="outline" type="button">
                  Upload
                </Button>
              </CldUploadButton>
            </div>
          </div>
          <div>
            <Label htmlFor="firstName" className="mb-2 block">
              First Name
            </Label>

            <Input
              type="text"
              id="firstName"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="mb-2 block">
              Last Name
            </Label>
            <Input
              type="lastName"
              id="lastName"
              register={register}
              disabled={isLoading}
              errors={errors}
            />
          </div>

          <div>
            <Button disabled={isLoading} type="submit" className="w-full">
              Finish
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SetupForm
