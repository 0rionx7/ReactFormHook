import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AccountDetailsSchema, type AccountDetailsType } from '../schema';
import { useAppDispatch } from '../../../app/hooks';
import { setStep, updateData } from '../slice';
import Field from '../../../Field';

export type TitleProps = { title: string };

export default function AccountDetails({ title }: TitleProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountDetailsType>({
    resolver: zodResolver(AccountDetailsSchema),
  });
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<AccountDetailsType> = (data) => {
    dispatch(updateData(data));
    dispatch(setStep(2));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center">{title}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field label="Username" error={errors.username?.message}>
            <input
              {...register('username')}
              type="text"
              autoComplete="username"
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            />
          </Field>
          <Field label="Password" error={errors.password?.message}>
            <input
              {...register('password')}
              type="password"
              autoComplete="password"
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            />
          </Field>
          <Field
            label="Confirm password"
            error={errors.confirmPassword?.message}
          >
            <input
              {...register('confirmPassword')}
              type="password"
              autoComplete="confirmPassword"
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            />
          </Field>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="submit"
              className="rounded-xl px-4 py-2 shadow bg-black text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
