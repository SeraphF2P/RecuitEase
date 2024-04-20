import { cn } from "~/lib/cva";
import Image, { type ImageProps } from "next/image";
import type { ElementType, FC } from "react";

interface NextImageProps extends ImageProps {
  className?: string;
  resoloution?: { w: number; h: number };
  wrapper?: ElementType;
}

export const NextImage: FC<NextImageProps> = ({
  className,
  wrapper = "div",
  sizes,
  ...props
}) => {
  const Component = wrapper;
  return (
    <Component className={cn("relative", className)}>
      <Image
        className={cn("absolute inset-0 m-0 object-cover ")}
        fill
        {...props}
        alt={props.alt}
      />
    </Component>
  );
};
