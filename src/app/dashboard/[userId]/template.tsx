"use client";

import type { ReactNode } from "react";

type templateProps = {
  children: ReactNode;
};

export default function template({ children }: templateProps) {
  return (
    <main className=" flex flex-col   gap-8 px-4 pt-24 sm:px-8 ">
      {children}
    </main>
  );
}
