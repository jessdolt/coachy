import getCurrentUser from "@/actions/getCurrentUser"
import DesktopSidebar from "./desktop-sidebar"
import Navbar from "../navbar"

interface SidebarProps {
  children: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = async ({ children }) => {
  const currentUser = await getCurrentUser()

  return (
    <div className="min-h-screen relative flex flex-col">
      <DesktopSidebar />

      <div className="ml-none lg:ml-60 flex-1 flex flex-col">
        <Navbar currentUser={currentUser!} />
        <div className="flex-1 py-4">{children}</div>
      </div>
    </div>
  )
}

export default Sidebar
