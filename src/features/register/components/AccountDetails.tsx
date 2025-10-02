import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AccountDetailsSchema, type AccountDetailsType } from '../schema';
import { useAppDispatch } from '../../../app/hooks';
import { setStep, updateData } from '../slice';
import Field from '../../../Field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormCard } from '@/features/register/components/FormCard';

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
