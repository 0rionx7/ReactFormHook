type FieldProps = {
  label: string;
  error: string | undefined;
  children: React.ReactNode;
};

export default function Field({ label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      {children}
      {error ? (
        <p className="text-sm text-red-600" data-cy={`${label}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
