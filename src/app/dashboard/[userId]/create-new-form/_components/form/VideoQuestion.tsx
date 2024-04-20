"use client";

import { useState } from "react";
import type { Control, FieldErrors } from "react-hook-form";
import type { ZOD } from "~/lib/ZOD";
type VideoQuestionQuestionType = Zod.infer<
  (typeof ZOD.question)["VideoQuestion"]
>;
type VideoQuestionProps = {
  control: Control<VideoQuestionQuestionType, unknown>;
  errors?: FieldErrors<VideoQuestionQuestionType>;
};

export default function VideoQuestion({ control, errors }: VideoQuestionProps) {
  const [maxDuration, setMaxDuration] = useState({
    duration: 1,
    unit: 1,
  });
  return (
    <div className="flex flex-col gap-2 py-2">
      <input
        className="form-input "
        type="text"
        {...control.register("additionInformition")}
        placeholder="additional informition"
      />
      <div className="flex gap-2">
        <input
          className=" form-input inline  w-1/2 "
          placeholder="max duration"
          type="number"
        />
        <input
          type="hidden"
          {...control.register("maxDuration", {
            value: maxDuration.duration * maxDuration.unit,
          })}
        />
        <select
          onChange={(e) =>
            setMaxDuration((prev) => {
              return {
                duration: prev.unit,
                unit: +e.target.value,
              };
            })
          }
          className=" form-select inline w-1/2  rounded-md "
        >
          <option value={1}>Seconds</option>
          <option value={60}>Minute</option>
        </select>
        {errors && (
          <p className="form-error">
            {errors.additionInformition
              ? errors.additionInformition.message
              : errors.maxDuration
                ? errors.maxDuration.message
                : ""}
          </p>
        )}
      </div>
    </div>
  );
}
