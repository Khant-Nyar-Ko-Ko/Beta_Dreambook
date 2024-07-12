import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "block rounded-md text-xs md:text-sm font-primary py-0 md:py-2 duration-300 ",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-darkMode1 text-black dark:text-white border border-gray-300 focus:border-primary w-[150px] md:w-[500px]",
        title:"bg-white dark:bg-darkMode1 text-black dark:text-white border border-gray-300 focus:border-primary w-[150px] md:w-[350px]",
        destructive: "bg-red-100 text-red-900 border-red-500 focus:border-red-700",
        outline: "bg-transparent text-black dark:text-white border-gray-300 focus:border-primary",
        subtle: "bg-gray-100 text-gray-700 border-gray-200 focus:border-primary",
        ghost: "bg-transparent text-black dark:text-white focus:border-primary",
        info: " w-[250px] md:w-[500px] focus:border-primary bg-white dark:bg-darkMode1",
        phone: "bg-white text-black dark:text-white border-gray-300 border focus:border-primary w-[150px] md:w-[270px] ml-[20px]",
        reply:"bg-white dark:bg-darkMode1 text-black dark:text-white w-[500px] border-none"
      },
      inputSize: {
        default: "h-8 md:h-10 py-2 px-1 md:px-4",
        sm: "h-8 px-2 rounded-lg",
        lg: "h-12 px-5 rounded-md w-[150px] md:w-full",
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

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  inputType?: "default" | "password" | "email" | "text";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, inputType, ...props }, ref) => {    
    return (
      <input
        type={inputType === "default" ? "text" : inputType}
        className={cn(inputVariants({ variant, inputSize, inputType }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };