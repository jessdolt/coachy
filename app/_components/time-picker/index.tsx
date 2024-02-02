import { generateTimeList } from "@/lib/utils"
import React, { useEffect, useRef, useState } from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TimeSlot } from "@/types"

interface TimePickerProps {
  value: string
  disabled?: boolean
  arrayIndex: number
  hour: any
  onChange: (arrayIndex: number, hour: TimeSlot, value: string) => void
}

const TimePicker: React.FC<TimePickerProps> = ({
  arrayIndex,
  value,
  hour,
  disabled,
  onChange,
}) => {
  const timeList12Hour = generateTimeList()

  return (
    <Select
      defaultValue={value}
      disabled={disabled}
      onValueChange={(value) => onChange(arrayIndex, hour, value)}
    >
      <SelectTrigger className="w-[100px] p-2">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {timeList12Hour.map((time, index) => (
            <SelectItem key={index} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default TimePicker
