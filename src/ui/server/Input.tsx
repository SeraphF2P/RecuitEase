import { type ComponentProps, forwardRef, useId } from "react";
import { cn } from "~/lib/cva";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  errorMSG?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMSG = "", type = "text", className, ...props }, ref) => {
    const id = useId();

    return (
      <div
        className={cn(
          "relative flex w-full flex-col justify-start pb-6 ",
          className,
        )}
      >
        <input
          ref={ref}
          id={id}
          autoFocus={true}
          className={cn("form-input   ", {
            "border-rose-500": !!errorMSG,
            "h-10 text-neutral-black placeholder:text-center placeholder:capitalize":
              ["text", "email", "password", "number"].includes(type),
            "w-full bg-neutral-white p-0": type === "color",
          })}
          placeholder={label}
          type={type}
          {...props}
        />
        {errorMSG && <span className="form-error ">{errorMSG}</span>}
      </div>
    );
  },
);
