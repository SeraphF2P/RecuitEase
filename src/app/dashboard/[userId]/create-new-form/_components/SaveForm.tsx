"use client";

import { useRef } from "react";
import useReduxFormSlice from "~/hooks/useReduxFormSlice";
import { api } from "~/trpc/react";
import { Btn, Input } from "~/ui";

type SaveFormProps = {
  userId: string;
};

export default function SaveForm({ userId }: SaveFormProps) {
  const { values } = useReduxFormSlice();
  const { mutate } = api.form.saveForm.useMutation();
  const { mutate: checkIfAvailable } = api.form.checkIfAvailable.useMutation();
  const FormNameField = useRef<HTMLInputElement>(null);
  console.log(values);
  return (
    <div className=" flex items-start justify-center">
      <Input ref={FormNameField} label="form name" />
      <input type="hidden" value={userId} />
      <Btn
        onClick={() => {
          if(FormNameField.current == null) return;
          mutate({
            userId,
            name: FormNameField.current.value,
            ...values,
          })
        }
        }
      >
        save
      </Btn>
    </div>
  );
}
