import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { NextImage, NextLink } from "~/ui";
import ReduxProvider from "../lib/ReduxProvider";
import { Toaster } from "../lib/myToast";
import { getServerAuthSession } from "../server/auth";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import LoginModale from "./_components/LoginModale";
import Logout from "./_components/Logout";
import MenuBtn from "./_components/MenuBtn";
import SignUpModale from "./_components/SignUpModale";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "RecuitEase",
  description: "application tracking system web app",
  icons: [{ rel: "icon", url: "/log-icon.webp" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <html lang="en">
      <body
        className={` font-sans   [scrollbar-gutter:stable] ${inter.variable}`}
      >
        <ReduxProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            <Toaster />
            <Header>
              <NextLink href="/" className=" flex items-center gap-2">
                <NextImage
                  className=" aspect-square  w-8 mn:w-9 xs:w-10  "
                  src={"/log-icon.webp"}
                  sizes="(min-width: 420px) 36px , 36px,(min-width: 576px) 40px , 40px"
                  alt="logo"
                />
                <NextImage
                  className=" aspect-[192/24] w-28  mn:w-40 xs:w-48  "
                  src={"/log-name.webp"}
                  sizes="(min-width: 420px) 160px , 160px,(min-width: 576px) 192px , 192px"
                  alt="logo"
                />
              </NextLink>

              <MenuBtn>
                <ul
                  className={
                    "  absolute right-0 top-full mt-2 flex   w-full translate-x-full translate-y-0  flex-col  items-center  justify-center bg-primary/30 px-4  backdrop-blur  data-[state=closed]:-translate-x-full md:relative md:mt-0  md:flex-row md:bg-transparent "
                  }
                >
                  <li className=" w-full text-center">
                    <NextLink variant="ghost" href={`/`}>
                      home
                    </NextLink>
                  </li>
                  {session && (
                    <li className=" w-full text-center ">
                      <NextLink
                        variant="ghost"
                        href={`/dashboard/${session?.user.id}`}
                      >
                        dashboard
                      </NextLink>
                    </li>
                  )}
                  <li className=" w-full text-center">
                    <NextLink variant="ghost" href="#AboutUs">
                      about us
                    </NextLink>
                  </li>
                  <li className=" w-full text-center">
                    <NextLink variant="ghost" href="#">
                      others
                    </NextLink>
                  </li>
                  {session ? (
                    <li className="not-prose m-2 w-full text-center">
                      <Logout className="w-full text-sm mn:px-4 mn:py-2 mn:text-base">
                        logout
                      </Logout>
                    </li>
                  ) : (
                    <>
                      <li className="not-prose m-2 w-full text-center">
                        <LoginModale
                          variant="outline"
                          className=" w-full text-sm font-semibold text-neutral-black mn:px-4 mn:py-2 mn:text-base"
                        >
                          login
                        </LoginModale>
                      </li>
                      <li className=" not-prose m-2  w-full text-center">
                        <SignUpModale className="    w-full  text-sm mn:px-4 mn:py-2 mn:text-base">
                          sign up
                        </SignUpModale>
                      </li>
                    </>
                  )}
                </ul>
              </MenuBtn>
            </Header>
            {children}
            <Footer />
          </TRPCReactProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
