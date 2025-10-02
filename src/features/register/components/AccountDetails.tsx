import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormCard } from '@/features/register/components/FormCard';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectFirstStepData,
  setStep,
  updateFirstStepData,
} from '@/features/register/slice';
import {
  AccountDetailsSchema,
  type AccountDetailsType,
} from '@/features/register/schema';
import Field from '@/Field';

export type TitleProps = { title: string };

export default function AccountDetails({ title }: TitleProps) {
  const data = useAppSelector(selectFirstStepData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountDetailsType>({
    resolver: zodResolver(AccountDetailsSchema),
    defaultValues: {
      username: data.username,
      password: data.password,
      confirmPassword: data.confirmPassword,
    },
  });
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<AccountDetailsType> = (data) => {
    dispatch(updateFirstStepData(data));
    dispatch(setStep(2));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
      <FormCard title={title}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field label="Username" error={errors.username?.message}>
            <Input
              {...register('username')}
              type="text"
              autoComplete="username"
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            />
          </Field>
          <Field label="Password" error={errors.password?.message}>
            <Input
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
            <Input
              {...register('confirmPassword')}
              type="password"
              autoComplete="confirmPassword"
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            />
          </Field>
          <Button
            type="submit"
            className="rounded-xl px-4 py-2 shadow bg-black text-white"
          >
            Submit
          </Button>
        </form>
      </FormCard>
    </div>
  );
}
