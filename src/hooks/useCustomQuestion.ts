import { useLocalStorage } from '@mantine/hooks';
import { produce } from 'immer';
import type { FormEvent } from "react";
import { ZOD, type questionDetailsType, type z } from "../lib/ZOD";

export type createQuestionType = z.infer<typeof ZOD.question[keyof typeof ZOD.question]>;
export type customQuestionType = createQuestionType & {
  id: string;
}
export function useCustomQuestion({ key }: { key: string }) {
  const [values, setValues] = useLocalStorage<customQuestionType[]>({ key, defaultValue: [] });
  function create(values: createQuestionType) {
    setValues(prev => produce(prev, (draft) => {
      draft?.push({
        id: crypto.randomUUID(),
        ...values,
      })
    }
    ));
  }
  function update({ id, ...newData }: customQuestionType) {
    if (!values) return;
    const index = values.findIndex(
      (question) => question.id === id
    );
    if (index == -1) return;
    setValues(produce(values, draft => {
      draft[index] = {
        id,
        ...newData,
      }
    })

    );
  }
  function deleteVal(id: string) {
    console.log(id)
    if (!values) return;

    const index = values.findIndex((q: customQuestionType) => q.id === id);
    if (index == -1) return;
    setValues(produce(values, draft => {
      delete draft[index]
    })

    );
  }
  const validFormData = (e: FormEvent) => {
    e.preventDefault();
    const formValues = new FormData(e.target as HTMLFormElement);
    const values = Object.fromEntries(formValues.entries()) as unknown as questionDetailsType;
    return ZOD.question[values.type].parse(values);
  };

  const createHandler = (e: FormEvent) => {
    const validValues = validFormData(e)
    create(validValues);
  };
  const updateHandler = (id: string) => {
    return (e: FormEvent) => {
      const validValues = validFormData(e)
      update({ id, ...validValues })
    }

  };
  return { deleteVal, values, createHandler, updateHandler } as const;
}

export default useCustomQuestion;
