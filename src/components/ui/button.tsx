import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "flex item-center justify-center text-center rounded-md text-sm font-medium px-4 py-2 duration-300",
  {
    variants: {
      variant: {
        default: "bg-[#3A7AD5] text-white hover:bg-green-700",
        white: "text-[#3A7AD5] hover:text-white hover:bg-[#3A7AD5] rounded-full",
        menu: "text-black hover:text-white bg-transparent hover:bg-[#3A7AD5] rounded-full",
        destructive: "bg-red-500 text-white hover:bg-red-900",
        outline: "bg-transparent text-green-900 border border-green-900 hover:bg-green-700 hover:text-white",
        subtle: "bg-green-100 text-blue-100 hover:bg-blue-200",
        ghost: "bg-transparent hover:bg-blue-100",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
