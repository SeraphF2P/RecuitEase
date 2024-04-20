import Link, { type LinkProps } from "next/link";
import type { FC, ReactNode } from "react";
import { cn, linkvariants, type linkvariantsType } from "~/lib/cva";
interface NextLinkProps extends LinkProps, linkvariantsType {
  className?: string;
  children?: ReactNode;
}
export const NextLink: FC<NextLinkProps> = ({
  className,
  variant,
  shape,
  deActivated,
  ...props
}) => {
  return (
    <Link
      className={cn(
        linkvariants({
          variant,
          shape,
          deActivated,
        }),
        className,
      )}
      {...props}
    />
  );
};
