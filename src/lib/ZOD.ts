import { z } from "zod";
export { z } from "zod";
const question = {
  Paragraph: z.object({
    type: z.literal("Paragraph"),
    isOptional: z.coerce.boolean(),
    text: z.string().min(3, "question is requird"),
  }),
  ShortAnswer: z.object({
    type: z.literal("ShortAnswer"),
    isOptional: z.coerce.boolean(),
    text: z.string().min(3, "question is requird"),
  }),
  YesNo: z.object({
    type: z.literal("YesNo"),
    isOptional: z.coerce.boolean(),
    text: z.string().min(3, "question is requird"),
    disqualify: z.coerce.boolean().optional().default(false),
  }),
  MultipleChoice: z.object({
    type: z.literal("MultipleChoice"),
    isOptional: z.coerce.boolean(),
    text: z.string().min(3, "question is requird"),
    choices: z.array(z.string()).min(2, "choices cann't be less than two").max(4, "choices cann't be more than four"),
    maxChoice: z.coerce.number({ invalid_type_error: "number is required" }).min(1).optional().default(1),
    other: z.coerce.boolean().optional().default(false),
  }).refine(data => data.choices.length >= data.maxChoice, { path: ["custom"], message: "max number of choices exceeded the maximum" }),
  Date: z.object({
    type: z.literal("Date"),
    isOptional: z.coerce.boolean(),
    text: z.string().min(3, "question is requird"),
    date: z.coerce.date(),
  }),
  Number: z.object({
    type: z.literal("Number"),
    isOptional: z.coerce.boolean(),
    text: z.string().min(3, "question is requird"),
    max: z.number({ invalid_type_error: "max cannot be empty" }),
    min: z.number({ invalid_type_error: "min cannot be empty" }),
    allowNegative: z.coerce.boolean(),
  }),
  FileUpload: z.object({
    type: z.literal("FileUpload"),
    isOptional: z.coerce.boolean(),
    text: z.string().min(3, "question is requird"),
    fileUpload: z
      .object({
        name: z.string(),
        lastModified: z.number(),
        lastModifiedDate: z.date(),
        size: z.number(),
        type: z.enum(["image/peg"]),
        webkitRelativePath: z.string(),
      })
      .optional(),
  }),
  VideoQuestion: z.object({
    type: z.literal("VideoQuestion"),
    isOptional: z.coerce.boolean(),
    text: z.string().min(3, "question is requird"),
    maxDuration: z.number(),
    additionInformition: z.string().optional(),
  }),
}
export const ZOD = {
  username: z.string().min(3, "username must be at least 3 charcters").max(20, "username can't exceed 20 charcters"),
  auth: {
    signup: z.object({
      username: z.string({ required_error: "description" }).min(3, "username must be at least 3 charcters").max(20, "username can't exceed 20 charcters"),
      password: z.string()
        .min(8, "password must be between 8~20 charcters")
        .max(20, "password must be between 8~20 charcters")
        .regex(/(?=.*[a-z])/g, "a small letter required")
        .regex(/(?=.*\d)/g, "a number is required")
        .regex(/(?=.*[A-Z])/g, "an uppercase letter is required"),
      password_confirmation: z.string()
        .min(8, "password must be between 8~20 charcters")
        .max(20, "password must be between 8~20 charcters")
        .regex(/(?=.*[a-z])/g, "a small letter is required")
        .regex(/(?=.*\d)/g, "a number is required")
        .regex(/(?=.*[A-Z])/g, "an uppercase letter is required"),
    }).refine((data) => data.password === data.password_confirmation, {
      message: "Passwords don't match",
      path: ["password_confirmation"],
    }),
    login: z.object({
      username: z.string({ required_error: "description" }).min(3, "username must be at least 3 charcters").max(20, "username can't exceed 20 charcters"),
      password: z.string()
        .min(8, "password must be between 8~20 charcters")
        .max(20, "password must be between 8~20 charcters")
        .regex(/(?=.*[a-z])/g, "a small letter required")
        .regex(/(?=.*\d)/g, "a number is required")
        .regex(/(?=.*[A-Z])/g, "an uppercase letter is required"),
    })
  },
  form: z.object({
    name: z.string().min(1).max(64),
    userId: z.string().uuid(),
    coverImageUrl: z.string().min(1),
    fields: z.array(z.object({ name: z.string().min(1), isRequired: z.boolean(), isShowen: z.boolean() })),
    questions: z.union([question.Date, question.FileUpload, question.MultipleChoice, question.Number, question.Paragraph, question.ShortAnswer, question.VideoQuestion, question.YesNo]).array()
  }),
  question
}
export type questionTypes = keyof typeof ZOD.question
export type questionDetailsType<T extends questionTypes = questionTypes> = z.infer<typeof ZOD.question[T]>
export type questionDetailsTypeWithid<T extends questionTypes = questionTypes> = questionDetailsType<T> & { id: string }