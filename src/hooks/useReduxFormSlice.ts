import type { FormInformationSliceState } from "~/lib/redux";
import { formInformationSlice, useDispatch, useSelector } from "~/lib/redux";
import type { questionDetailsType, questionDetailsTypeWithid } from "../lib/ZOD";



export default function useReduxFormSlice() {
  const dispatch = useDispatch()
  const addImageUrl = (imageUrl: string) => {
    dispatch(formInformationSlice.actions.uploadCoverImage(imageUrl))
  }

  const personalInformation = {
    update: (val: FormInformationSliceState["fields"][number]) => {
      dispatch(formInformationSlice.actions.update(val))
    },
    createQues: (val: questionDetailsType) => {
      dispatch(formInformationSlice.actions.createQues(val))
    },
    updateQues: (val: questionDetailsTypeWithid) => {
      dispatch(formInformationSlice.actions.updateQues(val))
    },
    deleteQues: (val: { id: string }) => {
      dispatch(formInformationSlice.actions.deleteQues(val))
    }
  } as const
  const values = useSelector(state => state.formInformationSlice)

  return { addImageUrl, personalInformation, values }
}