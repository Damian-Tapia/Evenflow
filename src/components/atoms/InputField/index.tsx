interface InputFieldProps {
  id: string;
  type: "email" | "password" | "text";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon: React.ElementType;
  hasError?: boolean;
  ariaDescribedBy?: string;
}

export function InputField({
  id,
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
  hasError,
  ariaDescribedBy,
}: InputFieldProps) {
  return (
    <div
      className={`bg-white flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 ${
        hasError ? "ring-2 ring-red-500" : ""
      }`}
    >
      <Icon className="w-6 h-6 shrink-0" />
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-describedby={ariaDescribedBy}
        aria-invalid={hasError ?? false}
        className="flex-1 bg-transparent outline-none text-foreground font-normal text-xl placeholder:text-mid-gray"
        style={{ letterSpacing: "-0.4px" }}
      />
    </div>
  );
}
