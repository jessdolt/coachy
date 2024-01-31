import * as React from "react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<FieldValues>
  required?: boolean
  errors?: FieldErrors
  disabled?: boolean
  id?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, register, id, required, disabled, errors, ...props },

    ref
  ) => {
    if (register && id && errors) {
      return (
        <input
          id={id}
          autoComplete={id}
          disabled={disabled}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            errors[id] && "focus-ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
          {...props}
          {...register(id, { required })}
        />
      )
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
