import React from "react"
import { Control, UseFormRegister } from "react-hook-form"
import { FormValues } from "./availability-form"

interface TimeInputProps {
  value: string
  control: Control<FormValues>
  register: UseFormRegister<FormValues>
}

const TimeInput: React.FC<TimeInputProps> = ({ value, control, register }) => {
  return <div>TimeInput</div>
}

export default TimeInput
