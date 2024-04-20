import {
  type ComponentPropsWithoutRef,
  useId,
  forwardRef,
  type ElementRef,
} from "react";

type CheckboxWithLabelProps = {
  text: string;
} & ComponentPropsWithoutRef<"input">;

export const CheckboxWithLabel = forwardRef<
  ElementRef<"input">,
  CheckboxWithLabelProps
>(function ({ text, ...props }, ref) {
  const id = useId();
  return (
    <div className=" flex gap-2 px-2 ">
      <input
        id={id}
        type="checkbox"
        className="h-[18px] w-[18px] "
        ref={ref}
        {...props}
      />
      <label htmlFor={id} className=" select-none text-sm">
        {text}
      </label>
    </div>
  );
});
