import type { Control, FieldErrors } from "react-hook-form";
import type { ZOD } from "~/lib/ZOD";
import { Input } from "~/ui";

type NumberQuestionType = Zod.infer<(typeof ZOD.question)["Number"]>;
type NumberProps = {
  control: Control<NumberQuestionType, unknown>;
  errors?: FieldErrors<NumberQuestionType>;
};
export default function Number({ control, errors }: NumberProps) {
  return (
    <div className="py-2">
      <div className=" flex w-full items-center justify-between">
        <Input
          label="min"
          className="w-1/2"
          errorMSG={errors?.min?.message}
          type="number"
          {...control.register("min", { valueAsNumber: true })}
        />
        <Input
          label="max"
          className="w-1/2"
          errorMSG={errors?.max?.message}
          type="number"
          {...control.register("max", { valueAsNumber: true })}
        />
      </div>
      <div className=" flex w-full items-center gap-2 px-2">
        <input
          type="checkbox"
          className="h-4 w-4 "
          {...control.register("allowNegative")}
        />
        <span>allow negative numbers</span>
      </div>
    </div>
  );
}
