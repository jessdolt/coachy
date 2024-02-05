import React, { Fragment } from "react"
import { Transition, Dialog } from "@headlessui/react"
import useRoutes from "@/hooks/useRoutes"
import { BiLogOut } from "react-icons/bi"
import { signOut } from "next-auth/react"
import { IoIosArrowBack } from "react-icons/io"
import SidebarItem from "./sidebar-item"
import { Button } from "@/components/ui/button"
import { User } from "@/types"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface SidebarDrawer {
  isOpen: boolean
  onClose: () => void
  currentUser: User
}

const SidebarDrawer: React.FC<SidebarDrawer> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const routes = useRoutes()

  return (
    <Transition.Root show={isOpen}>
      <Dialog onClose={onClose} as="div" className="relative z-50 ">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0  bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden ">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 left-0 flex max-w-full pr-10  ">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300 "
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 "
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-xs">
                  <div className="bg-white h-full flex flex-col py-6 overflow-auto px-4 ">
                    <div className="h-20  -mt-2 flex justify-between items-center">
                      <h1 className="text-3xl font-bold">Coachy</h1>

                      <IoIosArrowBack
                        size={32}
                        onClick={onClose}
                        className="cursor-pointer"
                      />
                    </div>
                    <nav className="mt-6 flex flex-col justify-between">
                      <ul
                        role="list"
                        className="flex flex-col space-y-1"
                        onClick={() => onClose()}
                      >
                        {routes.map((route) => (
                          <SidebarItem {...route} key={route.path} />
                        ))}
                      </ul>
                    </nav>

                    <nav className="mt-auto space-y-4">
                      <div className="flex mt-auto items-center">
                        <Avatar className="w-12 h-12 mr-2 cursor-pointer outline outline-1 outline-white/70 ">
                          <AvatarImage
                            className="object-cover"
                            src={
                              currentUser.profileUrl ||
                              "/images/placeholder.jpg"
                            }
                          />
                        </Avatar>
                        <div className="flex flex-col">
                          <h1 className="text-base font-bold leading-none capitalize ">
                            {currentUser.fullName}
                          </h1>
                          <p className="text-sm text-gray-500 flex">
                            {currentUser.role}
                          </p>
                        </div>
                      </div>

                      <Button
                        className="flex items-center gap-2 w-full"
                        onClick={() => signOut({ callbackUrl: "/" })}
                      >
                        <BiLogOut size={24} />
                        Logout
                      </Button>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SidebarDrawer
