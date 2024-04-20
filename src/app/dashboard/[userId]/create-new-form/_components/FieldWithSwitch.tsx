"use client";
import { useState } from "react";
import useReduxFormSlice from "~/hooks/useReduxFormSlice";
import { type FormInformationSliceState } from "~/lib/redux";
import { tofront } from "../../../../../lib/helpers";

export default function FieldWithSwitch(
  props: FormInformationSliceState["fields"][number],
) {
  const {
    personalInformation: { update },
  } = useReduxFormSlice();
  const [isChecked, setisChecked] = useState(props.isRequired);
  const [isSwitched, setisSwitched] = useState(props.isShowen);
  update({ name: props.name, isShowen: isSwitched, isRequired: isChecked });
  return (
    <div className=" flex items-center justify-between p-4 text-sm font-semibold  capitalize">
      <div>{tofront(props.name)}</div>

      <div className="flex gap-2">
        <div className="  flex items-center gap-2 font-normal leading-6">
          <input
            type="checkbox"
            className="h-[18px] w-[18px] "
            checked={isChecked}
            onChange={() => {
              setisChecked((prev) => !prev);
            }}
          />
          <span>required</span>
        </div>
        <div className=" flex w-24 flex-row-reverse justify-between ">
          <label
            className="w-10 font-normal"
            htmlFor={props.name + "-isShowen"}
          >
            {isSwitched ? "show" : "hide"}
          </label>
          <div className=" relative flex h-6 w-[49px] items-center  overflow-hidden rounded-full border-[0.1px] border-[#ccc] px-1 ">
            <input
              id={props.name + "-isShowen"}
              type="checkbox"
              checked={isSwitched}
              onChange={() => {
                setisSwitched((prev) => {
                  if (isChecked && prev) {
                    setisChecked(false);
                  }
                  return !prev;
                });
              }}
              className=" peer absolute inset-0 appearance-none bg-white transition-colors checked:bg-primary  "
            />
            <span className="pointer-events-none relative h-[18px] w-[18px] translate-x-[23px] rounded-full border-[0.1px] border-[#ccc] bg-[#F4F4F4] transition-transform peer-checked:translate-x-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
