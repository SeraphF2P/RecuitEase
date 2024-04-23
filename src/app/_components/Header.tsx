"use client";

import type { ReactNode } from "react";
import { cn } from "~/lib/cva";
import { useScrollDir } from "~/hooks/useScrollDir";

export const Header = ({ children }: { children: ReactNode }) => {
  const dir = useScrollDir({
    onHoldDelay: 500,
  });
  return (
    <header
      className={cn(
        "  fixed  left-0 top-0 z-40  w-full  bg-neutral-white  py-4 shadow transition-transform",
        {
          " translate-y-0 duration-1000": dir === 0,
          " -translate-y-full ": dir === 1,
          "  -translate-y-full duration-1000": dir === -1,
        },
      )}
    >
      <div className="container flex items-center justify-between">
        {children}
      </div>
    </header>
  );
};
export default Header;
