import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ElementType,
} from "react";
import { cn } from "~/lib/cva";

function decoratore(name: ElementType) {
  const Component = name;
  return forwardRef<
    ElementRef<typeof name>,
    ComponentPropsWithoutRef<typeof name>
  >(({ className, ...props }, ref) => {
    return (
      <Component
        {...props}
        ref={ref}
        className={cn(
          " prose prose-sm prose-slate mn:prose-base prose-a:text-inherit prose-a:no-underline prose-a:transition-colors hover:prose-a:text-primary/90 ",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          className,
        )}
      />
    );
  });
}

export const Typography = {
  div: decoratore("div"),
  section: decoratore("section"),
  p: decoratore("p"),
  ul: decoratore("ul"),
  aside: decoratore("aside"),
};
