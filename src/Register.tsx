import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Field from "./Field";

type RegisterProps = {
  enteredValues: FormInput;
  setEnteredValues: React.Dispatch<React.SetStateAction<FormInput>>;
};

const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(20, { message: "Name must be at most 20 characters" }),
  email: z.email({ message: "Enter a valid email" }),
  agree: z
    .boolean()
    .refine((val) => val === true, { message: "You must accept the terms" }),
});
export type FormInput = z.infer<typeof FormSchema>;

export default function Register({
  enteredValues,
  setEnteredValues,
}: RegisterProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: enteredValues,
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    setEnteredValues(data);
    navigate("/done");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center">Signup</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field label="Name" error={errors.name?.message}>
            <input
              {...register("name")}
              type="text"
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            />
          </Field>

          <Field label="Email" error={errors.email?.message}>
            <input
              {...register("email")}
              type="email"
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            />
          </Field>

          <Field label="Agree with terms" error={errors.agree?.message}>
            <input {...register("agree")} type="checkbox" />
          </Field>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="submit"
              className="rounded-xl px-4 py-2 shadow bg-black text-white"
            >
              "Submit"
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
