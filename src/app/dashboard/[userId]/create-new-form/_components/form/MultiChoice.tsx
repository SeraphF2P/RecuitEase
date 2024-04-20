"use client";

import { useState, type ChangeEvent } from "react";
import {
  type FieldValues,
  useFieldArray,
  type Control,
  type FieldErrors,
} from "react-hook-form";
import type { ZOD } from "~/lib/ZOD";
import { Btn, Checkbox, Icon, Input } from "~/ui";
type MultiChoiceQuestionType = Zod.infer<
  (typeof ZOD.question)["MultipleChoice"]
>;
type MultiChoiceProps = {
  //? FieldValues is added to solve the ts error on useFieldArray name prop
  control: Control<MultiChoiceQuestionType & FieldValues, unknown>;
  errors?: FieldErrors<MultiChoiceQuestionType>;
};

export default function MultiChoice({ errors, control }: MultiChoiceProps) {
  const [content, setContent] = useState("");
  const { fields, append, remove, update } = useFieldArray({
    name: "choices",
    control,
    rules: {
      maxLength: 4,
      minLength: 2,
      required: true,
    },
  });
  return (
    <>
      <h3 className="  text-xl font-semibold capitalize">choices</h3>

      <div className="relative flex w-full flex-col  justify-center gap-4   pb-4 ">
        {fields?.map((field, index) => {
          return (
            <div
              key={field.id}
              className="flex w-full items-center justify-between"
            >
              <Btn
                onClick={() => remove(index)}
                variant="ghost"
                className=" aspect-square p-2 variant-alert"
              >
                <Icon.trash className="h-6 w-6" />
              </Btn>
              <input
                {...control.register(`choices.${index}`, {
                  onChange: (e: ChangeEvent) => {
                    const input = e.target as HTMLInputElement;
                    const value = input.value;
                    update(index, value);
                  },
                })}
                className=" form-input w-full rounded-md"
              />
              <Icon.checked className="mx-2 h-6 w-6" />
            </div>
          );
        })}
        {fields && fields.length < 4 && (
          <div className=" relative flex w-full items-center justify-between pb-6">
            <Icon.list className="mx-2 h-6 w-6" />
            <input
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="type here"
              className=" form-input w-full rounded-md placeholder:capitalize"
              type="text"
            />
            <Btn
              onClick={() => {
                if (content == "") return;
                append(content);
                setContent("");
              }}
              className=" aspect-square p-1"
              variant="ghost"
            >
              <Icon.plusCircleDotted className="h-8 w-8 " />
            </Btn>
            {errors && (
              <span className=" form-error ">
                {errors.choices ? errors.choices?.message : ""}
              </span>
            )}
          </div>
        )}
      </div>
      <Input
        label="max choices allowed"
        {...control.register("maxChoice")}
        inputMode="numeric"
        type="number"
        errorMSG={errors?.maxChoice ? errors.maxChoice?.message : undefined}
      />
      <div className=" flex w-full items-center gap-2 px-2">
        <Checkbox {...control.register("other")} />
        <span>enable "other" option</span>
      </div>
    </>
  );
}
