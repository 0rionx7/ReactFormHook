import { useNavigate } from "react-router";

import type { FormInput } from "./Register";

type DonePAgeProps = { enteredValues: FormInput };

export default function DonePage({ enteredValues }: DonePAgeProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-6">
        <h1 className="text-2xl font-semibold">You are registered!</h1>

        {enteredValues ? (
          <div className="rounded-xl border p-4 text-sm space-y-1">
            <div>
              <span className="font-medium">Name:</span> {enteredValues.name}
            </div>
            <div>
              <span className="font-medium">Email:</span> {enteredValues.email}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600">No saved values found.</p>
        )}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl px-4 py-2 shadow bg-black text-white"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
