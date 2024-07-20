import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center item-center rounded-md text-sm duration-500 font-primary",
  {
    variants: {
      variant: {
        default: "bg-default text-white hover:bg-dark dark:text-white dark:bg-dark",
        active: "text-white bg-default",
        white: "text-default hover:text-white hover:bg-default rounded-full",
        menu: "text-black hover:text-white bg-transparent hover:bg-default hover:bg-opacity-70 rounded-full dark:text-white",
        destructive: "bg-red-500 text-white hover:bg-red-900",
        outline:
          "bg-transparent text-default dark:text-default border dark:border-default border-default hover:bg-dark hover:text-white",
        subtle: "bg-green-100 text-blue-100 hover:bg-blue-200",
        ghost: "bg-transparent text-white",
        personalinfo:
          "  w-12 md:w-[250px] flex justify-between font-primary hover:text-white hover:bg-blue-500 active:bg-default active:text-white",
        detail:
          "w-[250px] flex justify-start gap-5 text-center hover:bg-blue-400 w-full rounded-none active:border-r-4 border-blue-300 duration-100",
      },

      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 p-2 rounded-md",
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
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
