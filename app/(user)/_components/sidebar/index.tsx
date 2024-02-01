import getCurrentUser from "@/actions/getCurrentUser"
import Navbar from "../navbar"
import DesktopSidebar from "./desktop-sidebar"

interface SidebarProps {
  children: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = async ({ children }) => {
  const currentUser = await getCurrentUser()

  return (
    <div className="min-h-screen relative flex flex-col">
      <DesktopSidebar />

      <div className="ml-60 flex-1 flex flex-col">
        <Navbar currentUser={currentUser!} />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

export default Sidebar
