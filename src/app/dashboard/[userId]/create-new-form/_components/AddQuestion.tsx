"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { questionsOpts } from "~/config/siteConfig";
import type { questionDetailsType, questionTypes, z } from "~/lib/ZOD";
import { ZOD } from "~/lib/ZOD";
import { Btn, CheckboxWithLabel, Input, Modale, type BtnProps } from "~/ui";
import { Additions } from "./Additions";

function AddQuestion({
  children,
  createQues,
  ...props
}: BtnProps & {
  createQues: (val: questionDetailsType) => void;
}) {
  const [type, setType] = useState<questionTypes>(questionsOpts[0].value);
  type ZodSchemaType<T extends questionTypes = typeof type> = z.infer<
    (typeof ZOD.question)[T]
  >;
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ZodSchemaType>({
    resolver: zodResolver(ZOD.question[type]),
    defaultValues: { type },
  });

  return (
    <Modale>
      <Modale.Btn {...props}>{children}</Modale.Btn>
      <Modale.Portal>
        <Modale.overlayer>
          <Modale.Content>
            <div className="relative flex flex-col overflow-hidden  rounded-3xl bg-neutral-50  p-4  shadow">
              <form
                onSubmit={handleSubmit((values) => createQues(values))}
                className=" flex h-full  max-h-[520px] w-[320px]  flex-col   space-y-2 overflow-y-scroll  accent-primary remove-scroll-bar"
              >
                <div className=" space-y-2  rounded-3xl border-[1px]    border-neutral-black p-2 ">
                  <label className="block px-2 text-lg font-semibold capitalize">
                    type
                  </label>
                  <select
                    className=" form-select w-full border-none   bg-transparent "
                    {...control.register("type", {
                      onChange: (e: ChangeEvent) => {
                        const inputField = e.target as HTMLSelectElement;
                        if (inputField == null) return;
                        setType(inputField.value as questionTypes);
                      },
                      value: type,
                    })}
                  >
                    {questionsOpts.map(({ name, value }) => {
                      return (
                        <option
                          key={name}
                          value={value}
                          className=" checked:bg-primary/70  hover:!bg-primary/30 hover:!text-primary  "
                        >
                          {name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <Input
                  errorMSG={errors?.text?.message}
                  type="text"
                  label="question"
                  {...control.register("text")}
                />
                <Additions type={type} control={control} errors={errors} />
                {errors && "custom" in errors && (
                  <div className="relative pb-4">
                    <span className="form-error">
                      {(errors.custom as { message: string })?.message}
                    </span>
                  </div>
                )}
                <CheckboxWithLabel
                  text="optional"
                  {...control.register("isOptional")}
                />
                <div className="flex justify-between ">
                  <Modale.Close
                    variant="ghost"
                    className="capitalize   variant-alert"
                  >
                    <span>cancel </span>
                  </Modale.Close>
                  <Btn type="submit">save</Btn>
                </div>
              </form>
            </div>
          </Modale.Content>
        </Modale.overlayer>
      </Modale.Portal>
    </Modale>
  );
}

export default AddQuestion;
