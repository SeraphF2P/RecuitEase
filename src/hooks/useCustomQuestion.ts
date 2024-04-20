import type { FormEvent } from "react";
import { useLocalStorage } from "./useStorage";
import { z } from "zod";
import { produce } from 'immer'
import { questionsOpts } from "../config/siteConfig";
import ZOD from "../lib/ZOD";


export type createQuestionType = z.infer<typeof ZOD.question>;
export interface customQuestionType extends z.infer<typeof ZOD.question> {
  id: string;
}
export function useCustomQuestion({ key }: { key: string }) {
  const [values, setValues] = useLocalStorage<customQuestionType[]>(key, []);
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
    const values = Object.fromEntries(formValues.entries());
    return ZOD.question.parse(values);
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
