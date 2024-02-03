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
import { UseFormRegister } from "react-hook-form"
import { FormValues } from "./availability-form"

interface TimezonePickerProps {
  value: string
  onChange?: (value: string) => void
}

const TimezonePicker: React.FC<TimezonePickerProps> = ({ value, onChange }) => {
  const timezones = moment.tz.names()

  return (
    <div className="col-span-3 lg:col-span-1 flex flex-col">
      <Card className="p-4 lg:p-8">
        <h1>Timezone</h1>
        <Select value={value} onValueChange={onChange}>
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
