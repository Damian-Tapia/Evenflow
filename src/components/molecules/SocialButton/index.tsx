import { Button } from "@/components/atoms/Button";

interface SocialButtonProps {
  logo: string;
  logoAlt: string;
  label: string;
  onClick?: () => void;
}

export function SocialButton({ logo, logoAlt, label, onClick }: SocialButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2.5"
    >
      <img src={logo} alt={logoAlt} className="h-8 w-8" />
      {label}
    </Button>
  );
}
