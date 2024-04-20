import Link from "next/link";
import type { ComponentProps } from "react";
import { NextImage, Typography } from "~/ui";
import siteConfig from "../config/siteConfig";
import { cn, variants } from "../lib/cva";
import { getServerAuthSession } from "../server/auth";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <main className="   w-full    ">
      <Section className="container h-screen md:flex-row">
        <NextImage
          src={"undraw_resume_re_hkth.svg"}
          alt="landing page image "
          className="  aspect-[753/703] h-full max-h-80 drop-shadow-[4px_4px_3px] md:h-auto   md:w-80  "
        />
        <Typography.aside className=" md:max-w-[50%]">
          <h2>{siteConfig.landing.title}</h2>
          <p>{siteConfig.landing.text}</p>
        </Typography.aside>
      </Section>
      <Section className=" h-80 bg-slate-100 py-16 mn:py-8">
        <NextImage
          src={"undraw_setup_re_y9w8.svg"}
          alt="landing page image "
          className="  aspect-[897/585] h-full  drop-shadow-[4px_4px_3px]"
        />
        <Typography.aside>
          <p>{siteConfig.fill1.title}</p>
        </Typography.aside>
      </Section>
      <Section className="     ">
        <div className=" absolute inset-0 -z-10 overflow-hidden">
          <div className=" absolute -right-1/2 -top-20 aspect-square w-full rounded-full border-[24px] border-primary/70 xs:bottom-1/2 xs:right-0 xs:top-auto" />
          <div className=" absolute -bottom-20 right-1/2 aspect-square w-full rounded-full border-[24px] border-primary/70 xs:bottom-0 xs:right-1/2" />
        </div>

        <div className=" grid w-full grid-flow-col grid-rows-6 place-content-center  gap-4  xs:grid-rows-[repeat(3,auto)] lg:grid-flow-row lg:grid-cols-[repeat(3,auto)]    ">
          {siteConfig.cardsSection.map(({ text, title }, index) => (
            <Typography.div
              key={title}
              className={cn(
                " m-auto flex h-60  w-60 flex-col items-center justify-center rounded p-4  shadow mn:h-72 mn:w-72       ",
                {
                  " bg-primary/30": index % 2 === 0,
                  " bg-slate-100": index % 2 !== 0,
                },
              )}
            >
              <h2>{title}</h2>
              <p>{text}</p>
            </Typography.div>
          ))}
        </div>
      </Section>
      <Section className=" h-80   overflow-hidden py-16 text-neutral-white mn:py-8">
        <div className=" circles absolute inset-0 -z-10 scale-[2]" />
        <Typography.aside>
          <h2 className=" text-border">{siteConfig.fill2.title}</h2>
        </Typography.aside>
        {session && session.user ? (
          <Link
            className={variants({
              variant: "fill",
              className: "w-40 capitalize",
            })}
            href={"/dashboard"}
          >
            start
          </Link>
        ) : (
          <Link
            className={variants({
              variant: "fill",
              className: "w-40 capitalize",
            })}
            scroll={false}
            href={"#"}
          >
            register
          </Link>
        )}
      </Section>
    </main>
  );
}
const Section = (props: ComponentProps<"section">) => (
  <section
    {...props}
    className={cn(
      "relative flex  w-full flex-col items-center   justify-center gap-4 px-4 py-20 text-center  ",
      props.className,
    )}
  />
);
