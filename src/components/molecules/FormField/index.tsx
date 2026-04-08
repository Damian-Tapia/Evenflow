interface FormFieldProps {
  label: string;
  inputId: string;
  error?: string | null;
  children: React.ReactNode;
}

export function FormField({ label, inputId, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={inputId}
        className="text-black font-normal text-xl"
        style={{ letterSpacing: "-0.4px" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${inputId}-error`} className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
