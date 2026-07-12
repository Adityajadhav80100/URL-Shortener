import * as React from "react"

import { cn } from "@/lib/utils"

function Field({ className, ...props }) {
  return <div data-slot="field" className={cn("grid gap-2", className)} {...props} />
}

const FieldLabel = React.forwardRef(function FieldLabel(
  { className, ...props },
  ref
) {
  return (
    <label
      ref={ref}
      data-slot="field-label"
      className={cn(
        "text-sm font-medium leading-none text-foreground",
        className
      )}
      {...props}
    />
  )
})

FieldLabel.displayName = "FieldLabel"

export { Field, FieldLabel }