import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-normal bg-gray-300 transition-colors focus:outline focus:ring-2 focus:ring-ring focus:ring-offset-2 ",
  {
    variants: {
      variant: {
        default:
          "yesborder-transparent yesbg-primary yestext-primary-foreground hover:yesbg-primary/80",
        secondary:
          "yesborder-transparent yesbg-secondary yestext-secondary-foreground hover:yesbg-secondary/80",
        destructive:
          "yesborder-transparent yesbg-destructive yestext-destructive-foreground hover:yesbg-destructive/80",
        outline: "yestext-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
