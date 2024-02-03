import TabMain from "./tab-main"

const Header = () => {
  return (
    <>
      <div className="px-2 lg:px-0">
        <h1 className="text-2xl lg:text-3xl font-bold">Bookings</h1>
        <p className="text-sm lg:text-base text-muted-foreground">
          See upcoming and past events booked through your event type links.
        </p>
      </div>

      <TabMain />
    </>
  )
}

export default Header
