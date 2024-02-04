import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="h-full">
      <div className="py-16 flex flex-col justify-center items-start lg:items-center gap-4">
        <h1 className="text-5xl lg:text-6xl font-bold">
          {/* Mastering Excellence Together */}
          Be a someone on something
        </h1>
        <p className="text-muted-foreground ">
          Unlock your full potential with our seamless coaching experience –
          your journey to excellence starts here.
        </p>
      </div>
    </div>
  )
}
