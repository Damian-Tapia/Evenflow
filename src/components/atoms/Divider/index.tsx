interface DividerProps {
  label: string;
}

export function Divider({ label }: DividerProps) {
  return (
    <div className="flex items-center gap-4">
      <hr className="flex-1 border-[#7d7d7d]" />
      <span
        className="text-[#7d7d7d] font-semibold text-2xl"
        style={{ letterSpacing: "-0.48px" }}
      >
        {label}
      </span>
      <hr className="flex-1 border-[#7d7d7d]" />
    </div>
  );
}
