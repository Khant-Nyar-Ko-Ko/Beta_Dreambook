import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "block w-[350px] rounded-md text-sm font-medium px-4 py-2 duration-300 border",
  {
    variants: {
      variant: {
        default: "bg-white text-black border-gray-300 focus:border-blue-500",
        destructive:
          "bg-red-100 text-red-900 border-red-500 focus:border-red-700",
        outline:
          "bg-transparent text-black border-gray-300 focus:border-blue-500",
        subtle:
          "bg-gray-100 text-gray-700 border-gray-200 focus:border-blue-500",
        ghost: "bg-transparent text-black focus:border-blue-500",
      },
      inputSize: {
        default: "h-10 py-2 px-4",
        sm: "h-8 px-3 rounded-md",
        lg: "h-12 px-5 rounded-md",
      },
      inputType: {
        default: "text",
        password: "password",
        email: "email",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
      inputType: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-[400px] rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
