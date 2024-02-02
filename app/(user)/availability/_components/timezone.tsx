import moment from "moment-timezone"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"

const TimezonePicker = () => {
  const timezones = moment.tz.names()

  return (
    <div className="col-span-3 lg:col-span-1 flex flex-col">
      <Card className="p-4 lg:p-8">
        <h1>Timezone</h1>
        <Select>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Choose time" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {timezones.map((tz, index) => (
                <SelectItem key={index} value={tz}>
                  {tz}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Card>
    </div>
  )
}

export default TimezonePicker
