"use client";
import { useSelector } from "~/lib/redux";
import FieldWithSwitch from "./FieldWithSwitch";

const PersonalInformation = () => {
  const fields = useSelector((state) => state.formInformationSlice.fields);
  return (
    <section className=" divide-y-2  ">
      {fields.map((field) => {
        return <FieldWithSwitch key={field.name} {...field} />;
      })}
    </section>
  );
};

export default PersonalInformation;
