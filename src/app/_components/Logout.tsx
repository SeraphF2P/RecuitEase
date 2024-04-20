"use client";

import { signOut } from "next-auth/react";
import { Btn, type BtnProps } from "~/ui";

export default function Logout(props: Omit<BtnProps, "onClick">) {
  return <Btn onClick={() => signOut()} {...props} />;
}
