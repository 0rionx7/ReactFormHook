import { useAppSelector } from '@/app/hooks';
import type { TitleProps } from '@/features/register/components/AccountDetails';
import { selectFirstStepData } from '@/features/register/slice';

export default function Registered({ title }: TitleProps) {
  const { username } = useAppSelector(selectFirstStepData);

  return (
    <div className="flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-6">
        <h1 className="text-2xl font-semibold">{title}</h1>

        {username ? (
          <div className="rounded-xl border p-4 text-sm space-y-1">
            <div>
              <span className="font-medium">Name:</span> {username}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600">No saved values found.</p>
        )}
        <div className="flex items-center gap-3"></div>
      </div>
    </div>
  );
}
