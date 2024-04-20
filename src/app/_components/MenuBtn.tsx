"use client";

import { useToggle, useViewportSize, useWindowEvent } from "@mantine/hooks";
import { type PropsWithChildren } from "react";
import { cn } from "~/lib/cva";
import { Modale } from "~/ui";

export default function MenuBtn({ children }: PropsWithChildren) {
  const { width: Vwidth } = useViewportSize();
  const [isOpen, setIsOpen] = useToggle(Vwidth > 768 ? [true] : [false, true]);

  return (
    <Modale
      modal={false}
      open={Vwidth > 768 ? true : isOpen}
      onOpenChange={setIsOpen}
    >
      <Modale.Btn className=" relative h-10 w-10 flex-col items-center justify-center gap-1  p-2 md:hidden">
        <span
          className={cn(
            "    pointer-events-none h-1 w-full origin-center rounded-sm bg-white shadow transition-[width,transform,background] duration-1000",
            {
              "translate-y-2 rotate-45 scale-x-100": isOpen,
              "translate-y-0 rotate-0 scale-x-100": !isOpen,
            },
          )}
        />
        <span
          className={cn(
            " pointer-events-none h-1 w-full origin-center rounded-sm bg-white shadow transition-[width,transform,background] duration-1000 ",
            {
              " rotate-0 scale-x-0": isOpen,
              " scale-x-100": !isOpen,
            },
          )}
        />
        <span
          className={cn(
            "    pointer-events-none h-1 w-full origin-center rounded-sm bg-white shadow transition-[width,transform,background] duration-1000",
            {
              "-translate-y-2 -rotate-45 scale-x-100": isOpen,
              "translate-y-0": !isOpen,
            },
          )}
        />
        <span className=" sr-only">Menu</span>
      </Modale.Btn>
      <Modale.Content asChild>{children}</Modale.Content>
    </Modale>
  );
}
