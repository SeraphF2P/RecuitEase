"use client";
import { Additions } from "./Additions";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useReduxFormSlice from "~/hooks/useReduxFormSlice";
import {
  ZOD,
  type questionDetailsType,
  type questionDetailsTypeWithid,
} from "~/lib/ZOD";
import { Btn, ConfirmModale, Icon, CheckboxWithLabel } from "~/ui";

function Question({ ...props }: questionDetailsTypeWithid) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    personalInformation: { updateQues, deleteQues },
  } = useReduxFormSlice();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<questionDetailsType>({
    resolver: zodResolver(ZOD.question[props.type]),
    values: props,
  });

  return (
    <div>
      <div className=" flex items-center justify-between p-2  ">
        <div className=" flex flex-col ">
          <p className=" text-xs text-gray-500">{props.type}</p>
          <div className=" inline-flex items-center justify-center gap-2">
            <h3 className=" !m-0">{props.text}</h3>
            <span>
              <Icon.pencil />
            </span>
          </div>
        </div>
        <Btn onClick={() => setIsExpanded((prev) => !prev)} variant="ghost">
          <Icon.expandArrow className="h-6 w-6" />
        </Btn>
      </div>
      <div
        data-isexpanded={isExpanded}
        className=" grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 data-[isexpanded='true']:grid-rows-[1fr]  "
      >
        <form
          onSubmit={handleSubmit((values) =>
            updateQues({ id: props.id, ...values }),
          )}
          className="flex flex-col gap-4 overflow-hidden"
        >
          <Additions type={props.type} control={control} errors={errors} />
          <CheckboxWithLabel
            text="optional"
            {...control.register("isOptional")}
          />
          <div className="  flex justify-between py-2 ">
            <ConfirmModale
              title="delete question"
              content="are you sure you want to delete this question?"
              onConfirm={() => deleteQues({ id: props.id })}
              className="capitalize"
              variant="ghost"
            >
              <Icon.X />
              <span>delete </span>
            </ConfirmModale>
            <Btn type="submit">save</Btn>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Question;
