interface InputFieldProps {
  id: string;
  type: "email" | "password" | "text";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon: string;
  hasError?: boolean;
  ariaDescribedBy?: string;
}

export function InputField({
  id,
  type,
  value,
  onChange,
  placeholder,
  icon,
  hasError,
  ariaDescribedBy,
}: InputFieldProps) {
  return (
    <div
      className={`bg-white flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg ${
        hasError ? "ring-2 ring-red-500" : ""
      }`}
    >
      <img src={icon} alt="" className="w-6 h-6 shrink-0" />
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-describedby={ariaDescribedBy}
        aria-invalid={hasError ?? false}
        className="flex-1 bg-transparent outline-none text-[#7d7d7d] font-normal text-xl placeholder:text-[#7d7d7d]"
        style={{ letterSpacing: "-0.4px" }}
      />
    </div>
  );
}
