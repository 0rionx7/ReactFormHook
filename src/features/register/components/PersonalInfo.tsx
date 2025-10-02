import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import {
  PersonalInfoSchema,
  type Country,
  type PersonalInfoType,
} from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';

import Field from '../../../Field';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectData, selectStep, setStep, updateData } from '../slice';
import DatePicker from '@/features/register/components/DatePicker';
import type { TitleProps } from '@/features/register/components/AccountDetails';

const countries: Country[] = ['Greece', 'Cyprus', 'Italy', 'Spain'];

export default function PersonalInfo({ title }: TitleProps) {
  const { username } = useAppSelector(selectData);
  const step = useAppSelector(selectStep);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PersonalInfoType>({
    resolver: zodResolver(PersonalInfoSchema(username)),
  });

  if (step !== 2) return null;

  const onSubmit: SubmitHandler<PersonalInfoType> = (data) => {
    const dateOfBirth = data.dateOfBirth.toISOString();
    dispatch(updateData({ ...data, dateOfBirth }));
    dispatch(setStep(3));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center">{title}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field label="First Name" error={errors.firstName?.message}>
            <input
              {...register('firstName')}
              type="text"
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            />
          </Field>

          <Field label="Last Name" error={errors.lastName?.message}>
            <input
              {...register('lastName')}
              type="text"
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            />
          </Field>
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <DatePicker date={field.value} setDate={field.onChange} />
                {errors.dateOfBirth && (
                  <p className="text-sm text-red-600">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
            )}
          />

          <Field label="Country" error={errors.country?.message}>
            <select {...register('country')}>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </Field>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="submit"
              className="rounded-xl px-4 py-2 shadow bg-black text-white"
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
      </div>
    </div>
  );
}
