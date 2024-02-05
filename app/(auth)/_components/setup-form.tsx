"use client"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { CldUploadButton } from "next-cloudinary"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { User } from "@/types"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { COLLECTION_USERS } from "@/lib/collections"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { useSession } from "next-auth/react"
import { DEFAULT_AUTH_PAGE } from "@/lib/constants"

interface SetupFormProps {
  currentUser: User
}

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

const SetupForm: React.FC<SetupFormProps> = ({ currentUser }) => {
  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    if (session.status === "authenticated" && session.data?.user?.profileUrl) {
      router.push(DEFAULT_AUTH_PAGE)
    }

    if (session.status !== "authenticated") {
      router.push("/")
    }
  }, [session, router])

  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const FormSchema = z.object({
    firstName: z.string().min(2, {
      message: "First name should be at least 2 characters long",
    }),
    lastName: z.string().min(2, {
      message: "Last name should be at least 2 characters long",
    }),
    profileUrl: z.string().url({
      message: "Please enter a valid URL",
    }),
    phoneNumber: z.string().regex(phoneRegex, {
      message: "Please enter a valid phone number",
    }),
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      profileUrl: currentUser.profileUrl,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      phoneNumber: currentUser.phoneNumber,
    },
  })

  const profileUrl = form.watch("profileUrl")

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true)

    try {
      await updateDoc(doc(db, COLLECTION_USERS, currentUser.id), {
        profileUrl: data.profileUrl,
        firstName: data.firstName,
        lastName: data.lastName,
        fullName: `${data.firstName} ${data.lastName}`,
        phoneNumber: data.phoneNumber,
      })

      router.push(DEFAULT_AUTH_PAGE)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpload = (result: any) => {
    form.setValue("profileUrl", result?.info?.secure_url, {
      shouldValidate: true,
    })
  }

  if (!isMounted) return null

  return (
    <div className=" sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <div className="mb-6">
          <h1 className="font-extrabold  text-xl lg:text-2xl mb-1 ">
            Account Setup
          </h1>
          <p className="text-muted-foreground">Fill up your information</p>
        </div>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mt-2 flex flex-col gap-x-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-black">
                      Add your profile image
                    </FormLabel>
                    <FormControl>
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
                          <Button
                            disabled={isLoading}
                            variant="outline"
                            type="button"
                          >
                            Upload
                          </Button>
                        </CldUploadButton>
                      </div>
                    </FormControl>
                    <FormDescription className="text-red-600">
                      {form.formState.errors.profileUrl?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-black">First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription className="text-red-600">
                      {form.formState.errors.firstName?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-black">Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription className="text-red-600">
                      {form.formState.errors.lastName?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-black">Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription className="text-red-600">
                      {form.formState.errors.phoneNumber?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button disabled={isLoading} type="submit" className="w-full">
                Finish
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SetupForm
