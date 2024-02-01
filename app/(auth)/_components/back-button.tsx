import { Button } from "@/components/ui/button"
import { ChevronsLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const BackButton = () => {
  const router = useRouter()

  return (
    <Button
      variant="link"
      className="flex gap-2 p-0"
      onClick={() => router.back()}
    >
      <ChevronsLeft className="h-4 w-4" />
      <span>Go back</span>
    </Button>
  )
}

export default BackButton
