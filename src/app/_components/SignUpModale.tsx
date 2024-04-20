"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { ZOD, type z } from "~/lib/ZOD";
import { toast } from "~/lib/myToast";
import { debounce } from "~/lib/utile/performance";
import { api } from "~/trpc/react";
import { Btn, type BtnProps, Input, Modale, Typography } from "~/ui";
type SignUpFormType = z.infer<typeof ZOD.auth.signup>;
export default function SignUpModale({ ...props }: BtnProps) {
  const [isOpen, setisOpen] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(ZOD.auth.signup),
  });

  const { mutate: signup } = api.auth.signup.useMutation({
    onSuccess: async () => {
      const values = getValues();
      await signIn("credentials", {
        redirect: true,
        ...values,
      });
      toast({ type: "success", message: "sign up successfully" });
      reset();
      setisOpen(false);
    },
    onError: (err) => {
      console.error(err);
      toast({ type: "error", message: err.message });
    },
  });
  const { mutate: vlidateUsername, data: userNameIsAvailable } =
    api.auth.usernameNotAvailable.useMutation({});
  const checkIfUsernameIsAvailable = debounce((username) => {
    const u = username as string;
    if (u.length < 3) return;
    vlidateUsername({ username: u });
  }, 400);
  return (
    <Modale open={isOpen} onOpenChange={setisOpen}>
      <Modale.Btn {...props} />
      <Modale.Portal>
        <Modale.overlayer>
          <Modale.Content asChild>
            <Typography.section className="w-[280px]  space-y-4 rounded bg-neutral-white p-4 text-center shadow">
              <Modale.Title>sign up</Modale.Title>
              <form
                onSubmit={handleSubmit((values) => signup(values))}
                className="  "
              >
                <Input
                  className=" w-[240px]"
                  errorMSG={
                    !userNameIsAvailable && userNameIsAvailable !== undefined
                      ? "username is not available"
                      : errors.username?.message
                  }
                  {...register("username", {
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                      checkIfUsernameIsAvailable(e.target.value);
                    },
                  })}
                  label="username"
                />
                <Input
                  className=" w-[240px]"
                  errorMSG={errors.password?.message}
                  {...register("password")}
                  type="password"
                  label="password"
                />
                <Input
                  className=" w-[240px]"
                  errorMSG={errors.password_confirmation?.message}
                  {...register("password_confirmation")}
                  type="password"
                  label="confirm password"
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
            </Typography.section>
          </Modale.Content>
        </Modale.overlayer>
      </Modale.Portal>
    </Modale>
  );
}
