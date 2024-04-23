"use client";

import useReduxFormSlice from "~/hooks/useReduxFormSlice";
import AddQuestion from "./AddQuestion";
import Question from "./Question";

export default function AdditionalQuestions() {
  const {
    personalInformation: { createQues },
    values
  } = useReduxFormSlice();
  return (
    <section className=" divide-y-2  ">
      {values?.questions?.map((ques) => {
        return <Question key={ques.id} {...ques} />;
      })}
      <div className=" pt-4">
        <AddQuestion createQues={createQues} variant="ghost">
          add question
        </AddQuestion>
      </div>
    </section>
  );
}
