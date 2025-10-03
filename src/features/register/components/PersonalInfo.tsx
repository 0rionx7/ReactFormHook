import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import {
  PersonalInfoSchema,
  type Country,
  type PersonalInfoType,
} from '@/features/register/schema';
import { zodResolver } from '@hookform/resolvers/zod';

import DatePicker from '@/features/register/components/DatePicker';
import type { TitleProps } from '@/features/register/components/AccountDetails';
import { Input } from '@/components/ui/input';
import { FormCard } from '@/features/register/components/FormCard';
import Field from '@/Field';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectFirstStepData,
  selectSecondStepData,
  setStep,
  updateSecondStepData,
} from '@/features/register/slice';
import { useEffect } from 'react';

const countries: Country[] = ['Greece', 'Cyprus', 'Italy', 'Spain'];

export default function PersonalInfo({ title }: TitleProps) {
  const { username } = useAppSelector(selectFirstStepData);
  const data = useAppSelector(selectSecondStepData);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<PersonalInfoType>({
    resolver: zodResolver(PersonalInfoSchema(username)),
    defaultValues: {
      ...data,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
    },
  });

  useEffect(() => {
    const subscription = watch((data) => {
      const dateOfBirth = data.dateOfBirth?.toISOString();
      dispatch(updateSecondStepData({ ...data, dateOfBirth }));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, dispatch]);

  const onSubmit: SubmitHandler<PersonalInfoType> = (data) => {
    const dateOfBirth = data.dateOfBirth.toISOString();
    dispatch(updateSecondStepData({ ...data, dateOfBirth }));
    dispatch(setStep(3));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
      <FormCard title={title}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field label="First Name" error={errors.firstName?.message}>
            <Input
              {...register('firstName')}
              type="text"
              data-cy="firstName"
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            />
          </Field>
          <Field label="Last Name" error={errors.lastName?.message}>
            <Input
              {...register('lastName')}
              type="text"
              data-cy="lastName"
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            />
          </Field>
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <DatePicker
                  date={field.value}
                  setDate={field.onChange}
                  data-cy="dateOfBirth"
                />
                {errors.dateOfBirth && (
                  <p
                    className="text-sm text-red-600"
                    data-cy="dateOfBirth-error"
                  >
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
            )}
          />
          <Field label="Country" error={errors.country?.message}>
            <select {...register('country')} data-cy="country">
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </Field>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              className="rounded-xl px-4 py-2 shadow  bg-black text-white"
              onClick={() => {
                dispatch(setStep(1));
              }}
            >
              back
            </button>
            <button
              type="submit"
              className="rounded-xl px-4 py-2 shadow bg-black text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </FormCard>
    </div>
  );
}
