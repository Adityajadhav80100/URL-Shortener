import * as React from "react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

function InputGroup({ className, ...props }) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "flex w-full items-stretch overflow-hidden rounded-lg border border-input bg-background",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({ className, ...props }) {
  return (
    <Input
      data-slot="input-group-input"
      className={cn(
        "h-auto rounded-none border-0 bg-transparent px-3 py-2 shadow-none focus-visible:border-0 focus-visible:ring-0",
        className
      )}
      {...props}
    />
  )
}

function InputGroupAddon({ className, align = "inline-start", ...props }) {
  return (
    <div
      data-slot="input-group-addon"
      className={cn(
        "flex items-center justify-center border-input bg-muted px-3 text-sm text-muted-foreground",
        align === "inline-end" ? "border-l" : "border-r",
        className
      )}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }) {
  return <span className={cn("whitespace-nowrap", className)} {...props} />
}

export { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText }