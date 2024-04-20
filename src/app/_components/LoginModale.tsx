"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { parseAsBoolean, useQueryState } from "next-usequerystate";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ZOD, type z } from "~/lib/ZOD";
import { toast } from "~/lib/myToast";
import { Btn, Modale, Input, type BtnProps } from "~/ui";
type LoginFormType = z.infer<typeof ZOD.auth.login>;
export default function LoginModale({ ...props }: BtnProps) {
  const [isOpen, setisOpen] = useQueryState(
    "loginOpen",
    parseAsBoolean.withDefault(false),
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(ZOD.auth.login),
  });
  const router = useRouter();
  const submitHandler = async (values: LoginFormType) => {
    await signIn("credentials", { redirect: false, ...values });
    await setisOpen(null);
    toast({ type: "success", message: "loged in successfully" });
    reset();
    router.refresh();
  };
  return (
    <Modale
      open={isOpen}
      onOpenChange={async (open) => {
        await setisOpen(open ? true : null);
      }}
    >
      <Modale.Btn {...props} />
      <Modale.Portal>
        <Modale.overlayer>
          <Modale.Content asChild>
            <section className="w-[280px]  space-y-4 rounded bg-neutral-white p-4 text-center shadow">
              <Modale.Title>login</Modale.Title>
              <form onSubmit={handleSubmit(submitHandler)}>
                <Input
                  className=" w-[240px]"
                  errorMSG={errors.username?.message}
                  {...register("username")}
                  label="username"
                />
                <Input
                  className=" w-[240px]"
                  errorMSG={errors.password?.message}
                  {...register("password")}
                  type="password"
                  label="password"
                />

                <div className=" p-2">
                  <Btn
                    disabled={isSubmitting}
                    type="submit"
                    className="  w-full"
                  >
                    submit
                  </Btn>
                </div>
              </form>
            </section>
          </Modale.Content>
        </Modale.overlayer>
      </Modale.Portal>
    </Modale>
  );
}
