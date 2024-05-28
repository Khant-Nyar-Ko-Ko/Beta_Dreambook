import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "block w-[150px] md:w-[300px] rounded-md text-xs md:text-sm font-primary px-1 md:px-4 py-0 md:py-2 duration-300 border",
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
        default: " h-8 md:h-10 py-2 px-2 md:px-4",
        sm: "h-8 px-2 rounded-md",
        lg: "h-12 px-5 rounded-md",
      },
      inputType: {
        default: "text",
        password: "password",
        email: "email",
        text: "text",
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
    VariantProps<typeof inputVariants> {
  inputType?: "default" | "password" | "email" | "text";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputType, ...props }, ref) => {
    return (
      <input
        type={inputType === "default" ? "text" : inputType}
        className={cn(inputVariants({ inputType }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
