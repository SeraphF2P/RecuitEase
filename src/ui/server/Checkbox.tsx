import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "~/lib/cva";

export const Checkbox = forwardRef(
  ({ className, ...props }: ComponentPropsWithRef<"input">) => {
    return (
      <input
        type="checkbox"
        className={cn("h-[18px] w-[18px] ", className)}
        {...props}
      />
    );
  },
);
