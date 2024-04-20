"use client";

import { useSearchParams } from "next/navigation";
import { useQueryState } from "~/hooks/useQueryState";
import { cn } from "~/lib/cva";
import type { BtnProps } from "./Btn";

export const LinkWithParams = ({
  param,
  className,
  ...props
}: {
  param: { name: string; value: string };
} & BtnProps) => {
  const searchParams = useSearchParams();
  const { toggle } = useQueryState(param.name);
  const isActive = searchParams.has(param.name, param.value);

  return (
    <button
      data-active={isActive}
      onClick={() => toggle(param.value)}
      className={cn(" bg-green-500", className)}
      {...props}
    />
  );
};
