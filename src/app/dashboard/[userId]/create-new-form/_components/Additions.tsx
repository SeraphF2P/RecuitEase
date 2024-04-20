"use client";

import type { Control, FieldErrors } from "react-hook-form";
import type { questionDetailsType, questionTypes } from "~/lib/ZOD";
import { Input, CheckboxWithLabel } from "~/ui";
import MultiChoice from "./form/MultiChoice";
import Number from "./form/Number";
import VideoQuestion from "./form/VideoQuestion";

type AdditionsPropsType<T extends questionTypes = questionTypes> = {
  type: T;
  control: Control<questionDetailsType<T>, unknown>;
  errors?: FieldErrors<questionDetailsType<T>>;
};

export const Additions = ({ type, control, errors }: AdditionsPropsType) => {
  return (
    <>
      {type == "MultipleChoice" && (
        <>
          <MultiChoice
            control={control as AdditionsPropsType<"MultipleChoice">["control"]}
            errors={errors}
          />
        </>
      )}
      {type === "YesNo" && (
        <CheckboxWithLabel
          text="Disqualify candidate if the answer is no"
          type="checkbox"
          className="h-[18px] w-[18px] "
          {...control.register("disqualify")}
        />
      )}
      {type === "Date" && (
        <Input
          label="date"
          {...control.register("date", {
            valueAsDate: true,
          })}
          type="date"
          errorMSG={
            (errors as AdditionsPropsType<"Date">["errors"])?.date?.message
          }
        />
      )}
      {type === "Number" && (
        <Number
          control={control as AdditionsPropsType<"Number">["control"]}
          errors={errors as AdditionsPropsType<"Number">["errors"]}
        />
      )}
      {["Fileupload"].includes(type) && (
        <>
          <Input
            label="file"
            {...control.register("fileUpload")}
            errorMSG={
              (errors as AdditionsPropsType<"FileUpload">["errors"])?.fileUpload
                ?.message
            }
            className=" p-0 file:h-full file:border-0 file:px-4 "
            type="file"
          />
        </>
      )}
      {type === "VideoQuestion" && (
        <VideoQuestion
          control={control as AdditionsPropsType<"VideoQuestion">["control"]}
          errors={errors as AdditionsPropsType<"VideoQuestion">["errors"]}
        />
      )}
    </>
  );
};
